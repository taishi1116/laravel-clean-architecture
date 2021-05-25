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
        $mail_address = $request->input('mail');
        $token = Str::random(30);
        $register_url = "https://localhost:3000/accounts/register?token=$token";

        $pre_register_user = new PreRegisterUser();
        $created_at = Carbon::now('Asia/Tokyo');
        $pre_register_user->fill(['token' => $token ,'mail' => $mail_address , 'created_at' => $created_at ]);
        $pre_register_user->save();

        Mail::to($mail_address)->send(new PreRegisterUserMail($register_url));
        if(count(Mail::failures()) > 0){
            return response()->json(['message' =>'メールの送信に失敗しました。再度やり直してください。'],400);
        }

        return response()->json([],201);
    }
}