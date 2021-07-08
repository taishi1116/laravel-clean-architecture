<?php

namespace Tests\Feature;

use Database\Seeders\UserSeeder;
use App\Models\User;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Tests\TestCase;
use Illuminate\Database\Eloquent\Factories\Sequence;


class UserTest extends TestCase
{
    //テスト実施後は仮データの削除
    use RefreshDatabase;

    protected $user;
    protected $deleted_user;

    protected function setUp(): void
    {
        parent::setUp();
        // user_idを固定してテストデータを作成する
        $user_id = 'fKgSWFm7wNHGWYO3rekV';
        // 削除処理済みのUserを作成
        $deleted_user_id = 'deletedTemporaryUser';
        
        $this->user = User::factory()->create(['user_id' => $user_id]);
        $this->deleted_user = User::factory()->softDeleted()->create(['user_id' => $deleted_user_id]);
    }
    
    /**
     * ユーザ情報取得の正常系
     */
    public function testShow(){
        $user_id = 'fKgSWFm7wNHGWYO3rekV';
        $response = $this->actingAs($this->user)->getJson("/api/user/$user_id");
        $response->assertStatus(200);
    }

    /**
     * ユーザ情報取得の異常系
     * 認証しているuser_idとアクセスするuser_idが異なるのでmiddlewareエラー
     */
    public function testShowInvalidUserCheckMiddleware(){
        $user_id = 'dummy_user_id';
        $response = $this->actingAs($this->user)->getJson("/api/user/$user_id");
        $response->assertStatus(404);
    }

    /**
     * ユーザ情報登録の正常系
     *
     * @return void
     */
    public function testStore(){
        $password ='password';
        $response = $this->postJson('/api/user',
        ['name' =>'篠田 泰志','email' =>'test@example.com','password' =>$password,'password_confirmation' => $password]);

        $response->assertStatus(201);
    }

    /**
     * ユーザ情報登録の異常系
     * 必須項目のパラメータ(email)がフロントから送信されていない
     * @return void
     */
    public function testStoreInvalidParam(){
        $password ='password01';
        $response = $this->postJson('/api/user',
        ['name' =>'篠田 泰志','password' =>$password,'password_confirmation' => $password]);

        $response->assertStatus(400);
    }

    /**
     * ユーザ情報登録の異常系
     * passwordとpassword_confirmationが一致せずフォームリクエストでエラー
     */
    public function testStoreInvalidPasswordConfirm(){
        $password ='password01';
        $password_confirmation ='dummyPassword';
        $response = $this->postJson('/api/user',
        ['name' =>'篠田 泰志','email' =>'test@example.com','password' =>$password,'password_confirmation' => $password_confirmation]);

        $response->assertStatus(400);
    }

    /**
     * ユーザ情報更新の正常系
     */
    public function testUpdate(){
        $user_id = 'fKgSWFm7wNHGWYO3rekV';
        $password ='password01';
        $response = $this->actingAs($this->user)->putJson("/api/user/$user_id",
        ['name' =>'篠田 泰志','email' =>'test@example.com','password' =>$password,'password_confirmation' => $password]);

        $response->assertStatus(204);
        
    }

    /**
     * ユーザ情報更新の異常系
     * 必須パラメータが送信されていない
     */
    public function testUpdateInValidParam(){
        $user_id = 'fKgSWFm7wNHGWYO3rekV';
        $password ='password01';
        $response = $this->actingAs($this->user)->putJson("/api/user/$user_id",
        ['name' =>'篠田 泰志','password' =>$password,'password_confirmation' => $password]);

        $response->assertStatus(400);

    }
    /**
     * ユーザ情報削除の正常系
     */
    public function testDestroy(){
        $user_id = 'fKgSWFm7wNHGWYO3rekV';
        $response = $this->actingAs($this->user)->deleteJson("/api/user/$user_id");

        $response->assertStatus(204);
    }

    /**
     * ユーザ情報削除の異常系
     * ユーザーをすでに削除済みで、検索をかけても見つからない
     * ※論理削除(ソフトデリート)されているものはlaravelの使用上、見つからない形となる
     */
    public function testDestroyInvalidState(){
        $deleted_user_id = 'deletedTemporaryUser';
        $response = $this->actingAs($this->deleted_user)->deleteJson("/api/user/$deleted_user_id");
        // findOrFail()でNot foundとなる
        $response->assertStatus(404);
    }
}
