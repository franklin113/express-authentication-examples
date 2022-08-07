<?php

use Illuminate\Support\Facades\Route;

// use auth middleware
use Illuminate\Support\Facades\Auth;


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

// create authenticated routes
Route::middleware(['auth'])->group(function () {
    Route::get('/', function () {
        return view('home');
    });
});

Route::get('/login', function () {
    return view('login');
})->name('login');

Route::post('/login', function () {
    return view('login');
})->name('login');

Route::get('/logout', function () {
})->name('logout');

Route::get('/register', function () {
    return view('register');
})->name('register');
