<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;


    /**
     * 会員登録状態(ソフトデリート未実施)のテストデータ
     */
    public function definition()
    {
        return [
            'user_id' => $this->faker->uuid(),
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'password' => $this->faker->password(),
            'created_at' => Carbon::now(),
            'updated_at' => null,
            'deleted_at' => null,
        ];
    }


    /**
     * ソフトデリート状態のテストデータ
     */
    public function softDeleted()
    {
        return $this->state(function () {
            return [
                'deleted_at' => Carbon::now(),
            ];
        });
    }
}
