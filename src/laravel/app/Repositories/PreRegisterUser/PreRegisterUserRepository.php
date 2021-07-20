<?php

namespace App\Repositories\PreRegisterUser;

use App\Models\PreRegisterUser;
use Illuminate\Support\Carbon;
use \Exception;

class PreRegisterUserRepository implements PreRegisterUserInterface
{
    public function findByToken($token)
    {
        try {
            $currentTime = Carbon::now();
            $currentTimeBefore24hours =Carbon::now()->subHours(24);

            $is_valid_token = PreRegisterUser::where('token', $token)->whereBetween('created_at', [$currentTimeBefore24hours,$currentTime])->exists();

            if (!$is_valid_token) {
                return response()->json(['message' =>'有効な認証情報ではありません。再度仮登録を実施してください'], 400);
            }
            return response()->json();
        } catch (Exception $e) {
            return response()->json(['message' =>'認証エラー。URLをもう一度読み込んでください。'], 400);
        }
    }
}
