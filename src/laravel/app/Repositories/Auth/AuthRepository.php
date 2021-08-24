<?php

namespace App\Repositories\Auth;

use Illuminate\Support\Facades\Auth;

class AuthRepository implements AuthInterface
{
    public function login($request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required','min:8'],
        ]);

        if (Auth::attempt($credentials)) {
            $user = \Auth::user();

            //トークン破棄
            if ($user->tokens()->where('name', $user->name)->first() != null) {
                $user->tokens()->where('name', $user->name)->delete();
            }
            // トークン生成
            $user->token = $user->createToken($user->name)->plainTextToken;
            
            return response()->json(['user' => $user], 200);

        return response()->messageAndStatusCode('ユーザーが見つかりません。', 404);
    }
}
