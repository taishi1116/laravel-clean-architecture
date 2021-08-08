<?php
namespace App\Repositories\User;

use Illuminate\Http\Request;

interface UserInterface
{
    public function createUser(
        string $name,
        string $email,
        string $password,
        string $base64_representative_image
    );
    public function findUser(Request $request);
    public function updateUser(string $user_id, string $name, string $email, $base64_representative_image);
    public function deleteUser(string $user_id);
}
