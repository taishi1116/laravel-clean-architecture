<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\AuthRequest;
use App\Repositories\Auth\AuthRepository;

class AuthAPIController extends Controller
{
    private $auth_repository;

    public function __construct(AuthRepository $auth_repository)
    {
        $this->auth_repository = $auth_repository;
    }

    public function login(AuthRequest $request)
    {
        return $this->auth_repository->login($request);
    }

    public function logout(Request $request)
    {
        return $this->auth_repository->logout($request);
    }
}
