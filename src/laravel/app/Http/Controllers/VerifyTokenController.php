<?php

namespace App\Http\Controllers;

use App\Repositories\PreRegisterUser\PreRegisterUserRepository;
use Illuminate\Http\Request;


class VerifyTokenController extends Controller
{
    private $pre_register_user_repository;


    public function __construct(PreRegisterUserRepository $pre_register_user_repository)
    {
        $this->pre_register_user_repository = $pre_register_user_repository;
    }

    public function index($token){
        return $this->pre_register_user_repository->findByToken($token);
    }
}
