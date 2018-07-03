<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::resource('count', 'CountController');
Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/welcomeAboard', function () {
    return view('home');
});

Route::middleware('auth')->get('/user', 'UserController@basis_info');

Route::middleware('auth')->get('/articles/list', 'ArticleController@articles_list');
Route::middleware('auth')->post('/articles/save', 'ArticleController@save_article');
Route::middleware('auth')->post('/articles/changePublic', 'ArticleController@change_public');
// Route::middleware('auth')->post('/articles/changePublic', function () {
// 	return 'hh';
// });