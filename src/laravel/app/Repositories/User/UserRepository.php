<?php

namespace App\Repositories\User;

use App\Models\User;
use \Exception;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class UserRepository implements UserInterface
{
    public function createUser(string $name, string $email, string $password)
    {
        try {
            $user_id = Str::uuid();
            $hash_password = Hash::make($password);
            
            $user = new User();
            $user->fill(['user_id'=> $user_id , 'name' => $name ,'email' => $email , 'password' => $hash_password]);
            $user->save();
            return response()->json([], 201);
        } catch (Exception $e) {
            return response()->json(['message' =>'会員登録に失敗しました。'], 500);
        }
    }

    public function findUser(Request $request)
    {
        $name = $request->user()->name;
        $email =Crypt::decrypt($request->user()->email);
    
        return response()->json(["name" => $name, "email" => $email], 200);
    }

    public function updateUser(string $user_id, string $name, string $email)
    {
        // findOrFailで見つからなかった場合自動で例外を投げてくれる
        $user = User::findOrFail($user_id);

        try {
            $crypt_email = Crypt::encrypt($email);
            
            $user->name = $name;
            $user->email = $crypt_email;
            
            // update_atは自動更新される
            $user->save();
            
            return response()->json([], 204);
        } catch (Exception $e) {
            return response()->json(['message' =>'会員情報の更新に失敗しました。'], 500);
        }
    }

    // 論理削除(ソフトデリート対応)
    public function deleteUser(string $user_id)
    {
        $user = User::findOrFail($user_id);

        // 論理削除されているかをチェック
        if (!$user->trashed()) {
            try {
                $user->delete();
                return response()->json([], 204);
            } catch (Exception $e) {
                return response()->json(['message' =>'会員情報の削除に失敗しました'], 500);
            }
        } else {
            return response()->json(['message' =>'会員情報はすでに削除されています。'], 400);
        }
    }
}
