<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\TestAPIController;
use App\Http\Controllers\PreRegisterUserAPIController;
use App\Http\Controllers\VerifyTokenController;
use App\Http\Controllers\ArticleAPIController;


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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('test', [TestAPIController::class,"index"]);

//仮会員登録
Route::post('/user/pre_register', [PreRegisterUserAPIController::class, 'store']);

// 仮会員登録のtoken確認
Route::get('/verify/{token}', [VerifyTokenController::class, 'index']);


// 記事
Route::get('/articles', [ArticleAPIController::class, 'index']);
Route::get('/articles/{article_id}', [ArticleAPIController::class, 'show']);
Route::post('/articles', [ArticleAPIController::class, 'store']);
Route::put('/articles/{article_id}', [ArticleAPIController::class, 'update']);
Route::delete('/articles/{article_id}', [ArticleAPIController::class, 'destroy']);
