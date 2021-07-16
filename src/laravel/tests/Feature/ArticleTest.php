<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;
use App\Models\User;
use App\Models\Article;
use Illuminate\Support\Str;

class ArticleTest extends TestCase
{
    use RefreshDatabase,WithoutMiddleware;

    protected $user;
    protected $user_id;
    protected $article_id;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user_id = Str::uuid();
        $this->article_id = Str::uuid();

        $this->user = User::factory()->create(['user_id' => $this->user_id]);
    }

    public function testIndex()
    {
        Article::factory()->count(30)->create();
        $response= $this->actingAs($this->user)->WithoutMiddleware()->getJson('api/articles');
        $response->assertStatus(200);
    }

    /**
     * 求人一覧取得の正常系
     * 求人が0件で、ページネーション情報が付随してくる
     *
     */
    public function testIndexArticleZero()
    {
        $response= $this->actingAs($this->user)->WithoutMiddleware()->getJson('api/articles');
        $response->assertStatus(200)->assertJson([ "current_page"=> 1,
        "data"=> [],
        "first_page_url"=> "http://localhost/api/articles?page=1",
        "from"=> null,
        "next_page_url"=> null,
        "path"=> "http://localhost/api/articles",
        "per_page"=> 15,
        "prev_page_url"=> null,
        "to"=> null]);
    }

    public function testShow()
    {
        Article::factory()->create([
            'article_id' => $this->article_id,
            'user_id' => $this->user_id,
        ]);

        $response = $this->actingAs($this->user)->WithoutMiddleware()->getJson("api/articles/$this->article_id");
        $response->assertStatus(200);
    }

    public function testShowInvalid()
    {
        $response= $this->actingAs($this->user)->WithoutMiddleware()->getJson("api/articles/$this->article_id");
        $response->assertStatus(404);
    }

    public function testStore()
    {
        $title = 'エンジニアブログ01';
        $content = 'エンジニアブログはじめました。';

        $request_input = ['user_id' => $this->user_id,'title' => $title,'content' => $content];
        $response = $this->actingAs($this->user)->withoutMiddleware()->postJson('api/articles', $request_input);
        $response->assertStatus(201);
    }
    
    
    /**
     * 記事登録の異常系
     * 必須項目(title)漏れのためフォームリクエストでエラー
     */
    public function testStoreInvalidInputs()
    {
        $content = 'エンジニアブログはじめました。';
        
        $request_inputs = ['user_id' => $this->user_id,'content' => $content];
        $response = $this->actingAs($this->user)->withoutMiddleware()->postJson('api/articles', $request_inputs);
        $response->assertStatus(400);
    }
    
    public function testUpdate()
    {
        Article::factory()->create([
            'article_id' => $this->article_id,
            'user_id' => $this->user_id,
        ]);
        
        $title = 'エンジニアブログ更新テスト';
        $content = 'エンジニアブログ更新しました。';
        
        $request_inputs =['user_id' => $this->user_id,'title' => $title,'content' => $content];
        
        $response= $this->actingAs($this->user)->WithoutMiddleware()->putJson("api/articles/$this->article_id", $request_inputs);
        $response->assertStatus(200);
    }

    /**
     * 記事登録の異常系
     * 必須項目(content)漏れのためフォームリクエストでエラー
     */
    public function testUpdateInvalid()
    {
        Article::factory()->create([
            'article_id' => $this->article_id,
            'user_id' => $this->user_id,
        ]);

        $title = 'エンジニアブログ更新テスト';

        $request_inputs =['title' => $title];
        
        $response= $this->actingAs($this->user)->WithoutMiddleware()->putJson("api/articles/$this->article_id", $request_inputs);
        $response->assertStatus(400);
    }

    public function testDestroy()
    {
        Article::factory()->create([
            'article_id' => $this->article_id,
            'user_id' => $this->user_id,
        ]);
        $response = $this->actingAs($this->user)->deleteJson("api/articles/$this->article_id");

        $response->assertStatus(200);
    }
}
