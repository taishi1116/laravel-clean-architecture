<?php

namespace Tests\Feature;

use Database\Seeders\PreRegisterUserSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class VerifyTokenTest extends TestCase
{
    //テスト実施後はfactory and seederで注入した仮データの削除
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(PreRegisterUserSeeder::class);
    }

    /**
     * tokenの認証テスト(正常系)
     * seederのtokenとルートパラメータのtokenが一致しているため成功
     */
    public function testIndexVerifyToken()
    {
        $response = $this->get('/api/verify/a0a2a2d2-0b87-4a18-83f2-2529882be2de');
        $response->assertStatus(200);
    }

    /**
     * tokenの認証テスト(異常系)
     * seederのtokenとルートパラメータのtokenが一致していないため失敗
     */
    public function testIndexInvalidToken()
    {
        $response = $this->get('/api/verify/invalid-token');
        $response->assertStatus(400);
    }
}
