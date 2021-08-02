<?php
namespace App\Repositories\User;

use Illuminate\Http\Request;

interface UserInterface
{
    public function createUser(string $name, string $email, string $password);
    public function findUser(Request $request);
    public function updateUser(string $user_id, string $name, string $email);
    public function deleteUser(string $user_id);
}
