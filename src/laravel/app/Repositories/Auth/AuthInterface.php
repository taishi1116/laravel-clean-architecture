<?php

namespace App\Repositories\Auth;

interface AuthInterface
{
    public function login($request);
    public function logout($request);
}
