<?php

namespace App\Http\Controllers;

use App\Mail\PreRegisterUserMail;
use Illuminate\Http\Request;
use App\Http\Requests\PreRegisterRequest;
use App\Models\PreRegisterUser;
use Exception;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;


// TODO リポジトリパターンで書き直す
class PreRegisterUserAPIController extends Controller
{

    /**
     * 仮会員登録APIのコントローラー
     * updateOrCreateで初期はシンプルにinsert,token不正後の再登録ではupdateする動きとなっている
     *
     * @param $request
     * @return null
     *
     */
    public function store(PreRegisterRequest $request)
    {
        $mail_address = $request->input('mail');

        $token = Str::uuid();
        $created_at = Carbon::now('Asia/Tokyo');
        $register_url = "https://localhost:3000/accounts/register?token=$token";


        try {
            $pre_register_user = PreRegisterUser::updateOrCreate(['mail' =>$mail_address],['token' => $token,'created_at'=>$created_at]);
        }
        catch(Exception $e){
            response()->json(['message' =>'仮会員登録に失敗しました。再度やり直してください。',400]);
        }

        Mail::to($mail_address)->send(new PreRegisterUserMail($register_url));
        if(count(Mail::failures()) > 0){
            return response()->json(['message' =>'メールの送信に失敗しました。再度やり直してください。'],400);
        }

        return response()->json([],201);
    }
}
