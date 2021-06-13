<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Repositories\User\UserRepository;
use Illuminate\Http\Request;

class UserAPIController extends Controller
{
    private $user_repository;

    public function __construct(UserRepository $user_repository)
    {
        $this->user_repository =$user_repository;
    }

    public function store(UserRequest $request)
    {
        $name =$request->input('name');
        $email =$request->input('email');
        $password =$request->input('password');

        return $this->user_repository->createUser($name,$email,$password);
    }

    public function show($user_id)
    {
        $this->user_repository->findUser($user_id);
    }

    public function update(UserRequest $request, $user_id)
    {
        $name =$request->input('name');
        $email =$request->input('email');
        $password =$request->input('password');

        return $this->user_repository->updateUser($user_id,$name,$email,$password);
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
