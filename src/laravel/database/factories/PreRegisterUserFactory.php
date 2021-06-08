<?php

namespace Database\Factories;

use App\Models\PreRegisterUser;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class PreRegisterUserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = PreRegisterUser::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'id' => $this->faker->randomNumber(),
            // token認証チェックでも利用するので一旦固定
            'token' => "a0a2a2d2-0b87-4a18-83f2-2529882be2de",
            'mail' =>$this->faker->unique()->safeEmail(),
            'is_registered' =>false,
            'created_at' => Carbon::now(),
        ];
    }
}
