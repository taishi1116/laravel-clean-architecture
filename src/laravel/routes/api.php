<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\TestAPIController;
use App\Http\Controllers\PreRegisterUserAPIController;
use App\Http\Controllers\VerifyTokenController;
use App\Http\Controllers\ArticleAPIController;
use App\Http\Controllers\UserAPIController;
use App\Http\Controllers\AuthAPIController;

use App\Models\Article;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::get('test', [TestAPIController::class,"index"]);

//仮会員登録
Route::post('/user/pre_register', [PreRegisterUserAPIController::class, 'store']);

// 仮会員登録のtoken確認
Route::get('/verify/{token}', [VerifyTokenController::class, 'index']);


// 記事
Route::get('/articles', [ArticleAPIController::class, 'index']);
Route::get('/articles/{article_id}', [ArticleAPIController::class, 'show']);
Route::post('/articles', [ArticleAPIController::class, 'store'])->middleware('auth:sanctum', 'loginUserCheck', 'can:create,App\Models\Article');
Route::put('/articles/{article_id}', [ArticleAPIController::class, 'update'])->middleware('auth:sanctum', 'loginUserCheck', 'can:update,article_id');
Route::delete('/articles/{article_id}', [ArticleAPIController::class, 'destroy'])->middleware('auth:sanctum', 'loginUserCheck', 'can:delete,article_id');
// 認証
Route::post('/login', [AuthAPIController::class, 'login']);
Route::post('/logout', [AuthAPIController::class, 'logout']);

// 会員情報
Route::post('/user', [UserAPIController::class, 'store']);
Route::get('/user/{user_id}', [UserAPIController::class, 'show'])->middleware('auth:sanctum', 'loginUserCheck');
Route::put('/user/{user_id}', [UserAPIController::class, 'update'])->middleware('auth:sanctum', 'loginUserCheck');
Route::delete('/user/{user_id}', [UserAPIController::class, 'destroy'])->middleware('auth:sanctum', 'loginUserCheck');
