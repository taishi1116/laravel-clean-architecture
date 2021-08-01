<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Tests\TestCase;

class AuthTest extends TestCase
{
    //テスト実施後は仮データの削除
    use RefreshDatabase;

    private $email;
    private $password;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->email = 'dummy@example.com';
        $this->password = 'dummyPassword';
        User::factory()->create(['email' => $this->email,'password'=> Hash::make($this->password)]);
    }

    /**
     * ログインの正常系
     * requestsが正常かつ、cookieがsetされている
     */
    public function testLoginSuccess()
    {
        $request = ['email' => $this->email,'password'=>$this->password];
        $response = $this->postJson('/api/login', $request);
        dump($response);
        $response->assertStatus(200);
    }
    
    /**
     * ログインの異常系
     * 会員情報とrequestsの情報が異なる
     */
    public function testLoginFailedInvalidInput()
    {
        $request = ['email' => 'failed@example.com','password'=>$this->password];
        $response = $this->postJson('/api/login', $request);
        $response->assertStatus(404);
    }
    
    public function testLogout()
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->post('/api/logout');
        $response->assertStatus(200);
        $this->assertGuest();
    }
}
