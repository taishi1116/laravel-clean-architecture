<?php
namespace App\Repositories\User;

interface UserInterface
{
    public function createUser(string $name,string $email, string $password);
    public function findUser(string $user_id);
    public function updateUser(string $user_id,string $name,string $email, string $password);
    public function deleteUser(string $user_id);
}
