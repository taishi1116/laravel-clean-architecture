<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class LoginUserCheck
{
    /**
     * 第三者にIDの有無を判別させないため404エラーとする
     */
    public function handle(Request $request, Closure $next)
    {
        $loginId = Auth::id();
        $requestId = $request->user_id;

        if($loginId != $requestId){
            return response()->messageAndStatusCode('ユーザーが見つかりませんでした',404);
        }

        return $next($request);
    }
}
