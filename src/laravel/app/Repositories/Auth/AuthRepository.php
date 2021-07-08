<?php

namespace App\Repositories\Auth;

use Illuminate\Support\Facades\Auth;


class AuthRepository implements AuthInterface {
    public function login($request){
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required','min:8'],
        ]);

        if(Auth::attempt($credentials)){
            $request->session()->regenerate();
            return response()->json(['message' => 'ログインが完了しました。'], 200);            
        }

        return response()->json(['message' => 'ユーザーが見つかりません。'], 404);
    }

    public function logout($request){
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json(['message' => 'ログアウトが完了しました'], 200);
    }
}
