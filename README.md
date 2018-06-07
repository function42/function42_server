# 博客后台开发相关

## 目录
一. 布置到本地开发环境

二. 布置到服务器环境

三. 开发历程

## 一. 布置到本地开发环境
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

## 二. 布置到服务器环境


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

### 1. 添加计数器功能

#### 1.1 创建 Count 模型，移植数据表
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

#### 1.2 创建 CountController 控制器
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

### 2. 跨域

#### 2.1 新增中间件
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

#### 2.2 注册中间件
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
