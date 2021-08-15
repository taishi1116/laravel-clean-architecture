<?php

namespace App\Repositories\User;

use App\Models\User;
use \Exception;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserRepository implements UserInterface
{
    public function createUser(string $name, string $email, string $password, $base64_representative_image)
    {
        try {
            $user_id = Str::uuid();
            $hash_password = Hash::make($password);
            $decode_representative_image = base64_decode($base64_representative_image);

            $s3_image_path_name = "user/".$user_id;

            Storage::disk('s3')->put($s3_image_path_name, $decode_representative_image, 'public');
            $s3_image_path_url = Storage::disk('s3')->url($s3_image_path_name);
            
            $user = new User();
            $user->fill(['user_id'=> $user_id , 'name' => $name ,'email' => $email , 'password' => $hash_password, "representative_image" => $s3_image_path_url]);
            $user->save();
            return response()->json([], 201);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function findUser(Request $request)
    {
        $name = $request->user()->name;
        $email =$request->user()->email;
        $representative_image =$request->user()->representative_image;
    
        return response()->json(["name" => $name, "email" => $email,"representative_image" => $representative_image], 200);
    }

    public function updateUser(string $user_id, string $name, string $email, $base64_representative_image)
    {
        // findOrFailで見つからなかった場合自動で例外を投げてくれる
        $user = User::findOrFail($user_id);
        try {
            $decode_representative_image = base64_decode($base64_representative_image);
            
            $s3_image_path_name ="user/".$user_id;

            Storage::disk('s3')->put($s3_image_path_name, $decode_representative_image, 'public');
            $s3_image_path_url = Storage::disk('s3')->url($s3_image_path_name);
            
            $user->name = $name;
            $user->email = $email;
            $user->representative_image = $s3_image_path_url;
            
            // update_atは自動更新される
            $user->save();
            
            return response()->json([], 204);
        } catch (Exception $e) {
            return response()->json(['message' =>'会員情報の更新に失敗しました。'], 500);
        }
    }

    // 論理削除(ソフトデリート対応)
    // TODO s3の画像は残しておくか検討
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
