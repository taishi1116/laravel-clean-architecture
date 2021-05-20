<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PreResisterUserTest extends TestCase
{
    /**
     * 仮会員登録の正常系
     * @param mail メールアドレス
     * @return null
     */
    public function store()
    {
        $response = $this->postJson('/api/user/pre_register',['mail' =>'test@gmail.com']);
        $response->assertStatus(201);
    }

    /**
     * 仮会員登録の異常系
     * メールアドレスが形式ミスによりバリデーションに引っかかる
     * @param mail メールアドレス
     * @return null
     */
    public function testStoreValidationError(){
        $response = $this->postJson('/api/user/pre_register',['mail' =>'testgmailcom']);
        $response->assertStatus(400);
    }


    /**
     * 仮会員登録の異常系
     * メールアドレスがnullでバリデーションに引っかかる
     * @param mail メールアドレス
     * @return null
     */
    public function testStoreValidationErrorMailNull(){
        $response = $this->postJson('/api/user/pre_register');
        $response->assertStatus(400);
    }
}
