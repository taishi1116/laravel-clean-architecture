<?php

namespace App\Http\Controllers;

use App\Mail\PreRegisterUserMail;
use Illuminate\Http\Request;
use App\Http\Requests\PreRegisterRequest;
use App\Models\PreRegisterUser;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class PreRegisterUserAPIController extends Controller
{

    /**
     * 仮会員登録APIのコントローラー
     *
     * @param $request
     * @return null
     *
     */
    public function store(PreRegisterRequest $request)
    {
        $request_mail = $request->input('mail');
        $token = Str::random(30);
        $register_url = "https://localhost:3000/accounts/register?token=$token";

        $pre_register_user = new PreRegisterUser();
        $created_at = Carbon::now('Asia/Tokyo');
        $pre_register_user->fill(['token' => $token ,'mail' => $request_mail , 'created_at' => $created_at ]);
        $pre_register_user->save();

        Mail::to($request_mail)->send(new PreRegisterUserMail($register_url));

        return response()->json([],201);
    }
}
