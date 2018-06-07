# 布置到本地开发环境（终端默认git bash）

## 一. 克隆项目
```
git clone https://github.com/function42/function42_server.git
```

## 二. 修改.env
进入项目执行 `cp .env.example .env` ，打开 .env 修改如下
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=fun42db
DB_USERNAME=fun42
DB_PASSWORD=happy
```

## 三 启动 homestead，进入虚拟机，创建 mysql 数据库与用户
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

## 四. 下载包
进入项目根目录执行 `composer install`

## 五. 创建key
`php artisan key:generate`

## 六. 移植数据表
`php artisan migrate`

