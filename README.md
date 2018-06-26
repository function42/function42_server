# 博客后台开发相关

## 目录
一. 本地开发

二. 服务器

三. 开发历程

</br>

## 一. 本地开发
（终端默认git bash）

### 1. 克隆项目
```
git clone https://github.com/function42/function42_server.git
```

### 2. 修改.env
进入项目执行 `cp .env.example .env` ，打开 .env 修改如下
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=fun42db
DB_USERNAME=fun42
DB_PASSWORD=happy
```

### 3. 启动 homestead，进入虚拟机，创建 mysql 数据库与用户
此处略去安装教程。

```
vagrant up
vagrant ssh
mysql -uroot
```

```
create database fun42db;
create user 'fun42'@'%' identified by 'happy';
grant all on fun42db.* to 'fun42'@'%';
```

### 4. 下载包
进入项目根目录执行 `composer install`

### 5. 创建key
`php artisan key:generate`

### 6. 移植数据表
`php artisan migrate`

### 7. 进行开发
使用 `vagrant up` 加载虚拟机
使用 `npm run watch` 开启 js 的编译预览

</br>

## 二. 服务器

略。

</br>

## 三. 开发历程

注：环境为 homestead 虚拟环境

### 1. 创建项目

#### 1.1 创建初始 laravel 项目
```
composer create-project --prefer-dist laravel/laravel function42_server
```

#### 1.2 修改 .env 文件

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=fun42db
DB_USERNAME=fun42
DB_PASSWORD=happy
```

#### 1.3 修改 homestead.yaml 文件，创建新数据库和新用户
文件修改如下

```
sites:
    - map: function42.server
      to: /home/vagrant/code/function42_server/public

databases:
    - fun42db
```
用 `vagrant provision` 重导 homestead 设置

创建新数据库和新用户语句如下

```
create database fun42db;
create user 'fun42'@'%' identified by 'happy';
grant all on fun42db.* to 'fun42'@'%';
```

### 2. 添加计数器功能

#### 2.1 创建 Count 模型，移植数据表
根目录下执行 `php artisan make:model Count -m`

修改 /database/migrations 的 2018_03_11_090139_create_counts_table.php

```
public function up()
    {
        Schema::create('counts', function (Blueprint $table) {
            $table->increments('id');
            $table->bigInteger('count_num')->default(0);
            $table->timestamps();
        });
        DB::table('counts')->insert([
          'id' => 1,
          'count_num' => 0,
        ]);
    }
```

根目录下执行 `php artisan migrate` ，以对数据库产生作用

#### 2.2 创建 CountController 控制器
根目录下执行 `php artisan make:controller CountController --resource`

修改 /routes 的 web.php ，如下新增路由

```
Route::resource('count', 'CountController');
```

修改 /app/Http/Controllers 下的 CountController.php

```
use App\Count;

public function index()
{
    $count = Count::find(1)->count_num;
    return $count;

}

public function create()
{
    $count = Count::find(1)->count_num;
    $newcount = $count + 1;
    $res = Count::where('id', '=', 1) -> update(array('count_num' => $newcount));
    return $res;
}
```

### 3. 跨域

#### 4.1 新增中间件
在根目录下执行 `php artisan make:middleware CrossHttp`

修改 /app/Http/Middleware 下的 CrossHttp.php

```
public function handle($request, Closure $next)
{
  $response = $next($request);
  $response->header('Access-Control-Allow-Origin', '*');
  $response->header('Access-Control-Allow-Headers', 'Origin, Content-Type, Cookie, Accept, Authorization');
  $response->header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, OPTIONS');
  return $response;
}
```

#### 4.2 注册中间件
在 /app/Http 的 Kernel.php 中修改

```
protected $middleware = [
    \Illuminate\Foundation\Http\Middleware\CheckForMaintenanceMode::class,
    \Illuminate\Foundation\Http\Middleware\ValidatePostSize::class,
    \App\Http\Middleware\TrimStrings::class,
    \Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class,
    \App\Http\Middleware\TrustProxies::class,

    \App\Http\Middleware\CrossHttp::class,
];
```

### 5. 将默认前端框架切换成 react
根目录下执行 `php artisan preset react`

会出现下列字样

```
React scaffolding installed successfully.
Please run "npm install && npm run dev" to compile your fresh scaffolding.
```

进入根目录执行 `npm install` ，其实我不太清楚这句有什么用

### 6. 用户登陆相关

#### 6.1 开启用户登录和注册功能

根目录下执行 `php artisan make:auth` 

会出现下列字样

```
Authentication scaffolding generated successfully.
```

与此同时，目录 /app/Http/Controllers 里多了个 HomeController.php 文件，目录 /app 里多了个 User.php 文件，应该还有很多地方发生了改变，此处不述

主页页面重新载入后，右上角也会多出 LOGIN 和 REGISTER 的按钮

#### 6.2 用户表更改-基本信息更改

在之前 `php artisan migrate` 的时候已经把 user 表按默认创建好了，但那并不是我需要的

我需要的用户表中包括的数据段：

id、name、email、password、self_code、valid_code、level、rememberToken、timestamps

其中 id 和 name 以及 self_code 要保持唯一性

执行 `composer require doctrine/dbal` ，否则一会运行 `php artisan migrate` 会报错

执行 ` php artisan make:migration add_self_code_and_valid_code_columns_in_users_table --table=users` ，修改 2018_06_25_161352_add_self_code_and_valid_code_columns_in_users_table.php 如下

```
public function up()
{
	Schema::table('users', function (Blueprint $table) {
		$table->string('self_code')->unique()->nullable();
		$table->string('valid_code')->nullable();
	});
}

public function down()
{
	Schema::table('users', function (Blueprint $table) {
		$table->dropColumn('self_code');
		$table->dropColumn('valid_code');
	});
}
```

执行 ` php artisan make:migration modify_name_column_in_users_table --table=users` ，

修改 2018_06_25_164528_modify_name_column_in_users_table.php 如下

```
public function up()
{
	Schema::table('users', function (Blueprint $table) {
		$table->string('name')->unique()->change();
	});
}

public function down()
{
	Schema::table('users', function (Blueprint $table) {
		$table->dropUnique('users_name_unique');
	});
}
```

执行 `php artisan make:migration add_level_column_in_users_table --table=users ` ，修改如下

```
public function up()
{
	Schema::table('users', function (Blueprint $table) {
		$table->unsignedTinyInteger('level')->default(3);
	});
}

public function down()
{
	Schema::table('users', function (Blueprint $table) {
		$table->dropColumn('level');
	});
}
```

执行 `php artisan migrate` 

修改 `/app/User.php` 如下

```
protected $fillable = [
	'name', 'email', 'password', 'self_code', 'level'
];
```

修改 `\app\Http\Controllers\Auth\RegisterController.php` 如下

```
protected function create(array $data)
{
	return User::create([
		'name' => $data['name'],
		'email' => $data['email'],
		'password' => Hash::make($data['password']),
		'self_code' => str_random(6),
	]);
}
```

此处先不考虑 valid_code ，留着字段以后用

#### 6.3 用户权限限制（控制登录后可见页面）

 `php artisan make:middleware Permission`  创建中间件，用于给予对应 level 返回的页面，修改如下

```
use Auth;

public function handle($request, Closure $next)
{
	if (!in_array(Auth::user()->level,[0, 233])) {
		return redirect('/welcomeAboard');
	}
	return $next($request);
}
```

修改 Kernel.php

```
protected $routeMiddleware = [
    'auth' => \Illuminate\Auth\Middleware\Authenticate::class,
    'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
    'bindings' => \Illuminate\Routing\Middleware\SubstituteBindings::class,
    'can' => \Illuminate\Auth\Middleware\Authorize::class,
    'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
    'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,

    'permission' => \App\Http\Middleware\Permission::class,
];
```

修改 \app\Http\Controllers\HomeController.php 如下

```
class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('permission');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('adminhome');
    }
}
```

【注】记得在 /resources/view 下创建 adminhome.blade.php 文件

修改 \routes\web.php ，添加

```
Route::get('/welcomeAboard', function () {
    return view('home');
});
```

这样可以实现指定用户能看到 adminhome 页面还是 home 页面

#### 6.4 修改 blade 文件

对于 home.blade.php

```
@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Dashboard</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success">
                            {{ session('status') }}
                        </div>
                    @endif

                    Welcome aboard!
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
```

对于 adminhome.blade.php

```
<!DOCTYPE html>
<html>
<head>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>FUNCTION42 后台</title>
</head>
<body>
    <p>Hello</p>
    <div id="example"></div>
    <div id="root"></div>
</body>
<script src="{{ asset('js/app.js') }}"></script>
</html>
```

对于 /resources/assets/js/app.js 修改

```
require('./components/Main');
```

在 /resources/assets/js/components 中新增 Main.js

```
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Main extends Component {
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Main Component</div>

                            <div className="card-body">
                                I'm an main component!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}

```

### 7. 初步进行后端和用户有关的 api 的开发

根目录输入 `php artisan make:controller UserController --api --model=User` ，创建对用户的 controller

把 index() 函数修改成 basis_info()

```
use Auth;
public function basis_info()
{
	return Auth::User();
}
```

web.php 中添加

```
Route::middleware('auth')->get('/user', 'UserController@basis_info');
```

即是登陆后才可对该 api 发送请求

### 8. 引入 antd-design

命令行输入

```
npm install antd --save
npm install babel-plugin-import --save
npm install react-router-dom --save
```

新增 .babelrc 文件

```
{
  "plugins": [
    ["import", { "libraryName": "antd", "style": "css" }],
    ["transform-object-rest-spread"]
  ]
}
```

随后按自己需求修改页面。此处略。

### 9. 添加文章功能

根目录下执行

```
php artisan make:model Article -m
php artisan make:controller ArticleController --resource --model=Article
```

修改 2018_06_26_075915_create_articles_table.php

```
public function up()
{
    Schema::create('articles', function (Blueprint $table) {
        $table->increments('id');
        $table->boolean('is_public')->default(1);
        $table->string('title');
        $table->longText('content');
        $table->unsignedInteger('user_id');
        $table->unsignedBigInteger('likes_count')->default(0);
        $table->unsignedInteger('comments_id')->nullable();
        $table->timestamps();
    });
}
```

```
npm install marked --save
```

