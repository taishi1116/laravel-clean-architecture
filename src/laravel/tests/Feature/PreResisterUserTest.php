<?php

namespace Tests\Feature;

use App\Mail\PreRegisterUserMail;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class PreResisterUserTest extends TestCase
{

    //テスト実施後は仮データの削除
    use RefreshDatabase;
    
    /**
     * 仮会員登録の正常系
     * @param mail メールアドレス
     * @return null
     */
    public function testStore()
    {

        // メールがテストで送信されないように
        Mail::fake();

        $response = $this->postJson('/api/user/pre_register', ['mail' =>'test@gmail.com']);

        // mailableが送られたことをアサート
        Mail::assertSent(PreRegisterUserMail::class);

        $response->assertStatus(201);
    }

    /**
     * 仮会員登録の異常系
     * メールアドレスが形式ミスによりバリデーションに引っかかる
     * @param mail メールアドレス
     * @return null
     */
    public function testStoreValidationError()
    {
        $response = $this->postJson('/api/user/pre_register', ['mail' =>'testgmailcom']);
        $response->assertStatus(400);
    }


    /**
     * 仮会員登録の異常系
     * メールアドレスがnullでバリデーションに引っかかる
     * @param mail メールアドレス
     * @return null
     */
    public function testStoreValidationErrorMailNull()
    {
        $response = $this->postJson('/api/user/pre_register');
        $response->assertStatus(400);
    }
}
