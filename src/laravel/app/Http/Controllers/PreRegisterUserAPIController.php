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
use Aws\Ses\SesClient;
use Aws\Exception\AwsException;

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
        $to_mail = $request->input('email');

        $token = Str::uuid();
        $created_at = Carbon::now('Asia/Tokyo');
        $register_url = "http://localhost:3000/verify/token/$token";

        $client = new SesClient([
            'region' => env("AWS_DEFAULT_REGION"), // SESを設定しているリージョン
            'version' => '2010-12-01',
        ]);


        // 送信元メールアドレス
        // SESで設定したメールアドレス
        // サンドボックス状態で検証しているので、SESに登録したメアドにしか送れない
        $from_mail = env("MAIL_FROM_ADDRESS");
        $char_set = 'UTF-8';
        $subject = 'ブログサービス本登録リンクのお知らせ';
        $body = "個人開発ブログサービスの本登録リンクです。$register_url";


        try {
            $pre_register_user = PreRegisterUser::updateOrCreate(['mail' =>$to_mail], ['token' => $token,'created_at'=>$created_at]);

            $result = $client->sendEmail([
                'Destination' => [
                    'ToAddresses' => [$to_mail],
                ],
                'ReplyToAddresses' => [$from_mail],
                'Source' => $from_mail,
                'Message' => [
                    'Body' => [
                        'Text' => [
                            'Charset' => $char_set,
                            'Data' => $body,
                        ],
                    ],
                    'Subject' => [
                        'Charset' => $char_set,
                        'Data' => $subject,
                    ],
                ],
            ]);


            return response()->json([], 201);
        } catch (AwsException $e) {
            return response()->json(['message' =>'メールの送信に失敗しました。再度やり直してください。'], 400);
        }
    }
}
