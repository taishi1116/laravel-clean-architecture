<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class LoginUserCheck
{
    /**
     * ログインしているIdとユーザIdが一致しているかチェック
     * 一致していない場合は不正アクセスとなるためエラーを返す
     */
    public function handle(Request $request, Closure $next)
    {
        $loginId = Auth::id();
        $requestId = $request->user_id;

        if($loginId != $requestId){
            return response()->json(['message' =>'アクセス権が存在しません。'],403);
        }

        return $next($request);
    }
}
