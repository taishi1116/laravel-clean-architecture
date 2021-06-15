<?php

namespace Database\Seeders;

use App\Models\PreRegisterUser;
use Illuminate\Database\Seeder;

class PreRegisterUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        PreRegisterUser::factory()->create();
    }
}
