<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Response;


class ApiResponseServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * エラーレスポンスのテンプレート
     */
    public function boot()
    {
        Response::macro('messageAndStatusCode',function ($errMsg, $status = ResponseStatus::HTTP_INTERNAL_SERVER_ERROR){
            return response()->json(['message' => $errMsg],$status);
        });
    }
}
