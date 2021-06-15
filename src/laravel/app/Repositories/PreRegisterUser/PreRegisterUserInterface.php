<?php
namespace App\Repositories\PreRegisterUser;

interface PreRegisterUserInterface
{
    public function findByToken(string $token);
}



