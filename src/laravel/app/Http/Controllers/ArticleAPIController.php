<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ArticleRequest;
use App\Repositories\Article\ArticleRepository;
use Exception;

class ArticleAPIController extends Controller
{
    private $article_repository;

    public function __construct(ArticleRepository $article_repository)
    {
        $this->article_repository = $article_repository;
    }

    public function index()
    {
        $articles =  $this->article_repository->getArticlesWithPagination();
        // 0件でもfrontにレスポンスを返し、フロント側で表示分岐を実施する
        return response()->json($articles, 200);
    }

    public function show($article_id)
    {
        try {
            $article =  $this->article_repository->getArticleDetail($article_id);
            $response = ['title' => $article->title,'content' => $article->content,'created_at' => $article->created_at,'updated_at' => $article->created_at];
            return response()->json($response, 200);
        } catch (Exception $e) {
            return response()->messageAndStatusCode('記事が存在しません', 404);
        }
    }

    public function store(ArticleRequest $request)
    {
        $user_id =$request->input('user_id');
        $title =$request->input('title');
        $content =$request->input('content');
        
        $response =$this->article_repository->postNewArticle($user_id, $title, $content);

        if ($response) {
            return response()->messageAndStatusCode('記事の新規投稿が完了しました。', 201);
        } else {
            return response()->messageAndStatusCode('記事の新規投稿に失敗しました。', 500);
        }
    }

    public function update($article_id, ArticleRequest $request)
    {
        $title =$request->input('title');
        $content =$request->input('content');

        $response =  $this->article_repository->updateArticleDetail($article_id, $title, $content);

        if ($response) {
            return response()->messageAndStatusCode('記事の更新が完了しました。', 200);
        } else {
            return response()->messageAndStatusCode('記事の更新に失敗しました。', 500);
        }
    }
    

    public function destroy($article_id)
    {
        try {
            $response = $this->article_repository->deleteArticle($article_id);

            if ($response) {
                return response()->messageAndStatusCode('記事の削除が完了しました。', 200);
            } else {
                return response()->messageAndStatusCode('記事の削除に失敗しました', 500);
            }
        } catch (Exception $e) {
            return response()->messageAndStatusCode('記事が見つかりませんでした。', 404);
        }
    }
}
