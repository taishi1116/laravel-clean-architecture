<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserUpdateRequest;
use App\Http\Requests\UserStoreRequest;
use App\Repositories\User\UserRepository;
use Illuminate\Http\Request;

class UserAPIController extends Controller
{
    private $user_repository;

    public function __construct(UserRepository $user_repository)
    {
        $this->user_repository =$user_repository;
    }

    public function store(UserStoreRequest $request)
    {
        $name =$request->input('name');
        $email =$request->input('email');
        $password =$request->input('password');
        $representative_image =$request->input('representative_image');

        return $this->user_repository->createUser($name, $email, $password, $representative_image);
    }

    public function show(Request $request)
    {
        return $this->user_repository->findUser($request);
    }

    public function update(UserUpdateRequest $request, $user_id)
    {
        $name =$request->input('name');
        $email =$request->input('email');
        $representative_image =$request->input('representative_image');


        return $this->user_repository->updateUser($user_id, $name, $email, $representative_image);
    }

    /**
     * 会員情報の削除API
     * 復元というケースを想定しているため,論理削除となる
     */
    public function destroy($user_id)
    {
        return $this->user_repository->deleteUser($user_id);
    }
}
