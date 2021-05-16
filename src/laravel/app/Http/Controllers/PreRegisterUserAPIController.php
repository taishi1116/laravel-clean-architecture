<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PreRegisterUser;

class PreRegisterUserAPIController extends Controller
{

    /**
     * 仮会員登録APIのコントローラー
     *
     * @param $request
     * @return null
     */
    public function store(Request $request)
    {

        $pre_register_user = new PreRegisterUser();
        $pre_register_user->fill(['mail' => $request->input('mail')]);
        $pre_register_user->save();
    }
}
