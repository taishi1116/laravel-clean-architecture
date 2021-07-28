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
            $request->session()->regenerate();
            return response()->messageAndStatusCode(['data' => Auth::user()], 200);
        }

        return response()->messageAndStatusCode('ユーザーが見つかりません。', 404);
    }

    public function logout($request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->messageAndStatusCode('ログアウトが完了しました', 200);
    }
}
