<?php

namespace App\Repositories\Article;

use App\Models\Article;
use \Exception;
use Illuminate\Support\Str;


class ArticleRepository implements ArticleInterface {
    public function getAllArticles()
    {
        try {
            $response = array();
            foreach (Article::all() as $article) {
                $extract_article_info = ['article_id' => $article->title,'title' => $article->title,'content' => $article->content,'created_at' => $article->created_at,'updated_at' => $article->created_at];
                array_push($response,$extract_article_info);
            }
            
            return response()->json(['articles' => $response],200);
        }
        catch(Exception $e) {
            return response()->messageAndStatusCode('記事一覧を取得することができませんでした。',500);
        }
    }

    public function getArticleDetail($article_id)
    {
        $article = Article::findOrFail($article_id);

        $response = ['title' => $article->title,'content' => $article->content,'created_at' => $article->created_at,'updated_at' => $article->created_at];
        return response()->json($response,200);
    }

    public function postNewArticle(string $user_id,string $title,string $content)
    {
        try {
            $article = new Article();
            $article_id = Str::uuid();
            $article->fill(['article_id' => $article_id,'user_id' => $user_id,'title' => $title,'content' => $content]);
            $article->save();
            return response()->messageAndStatusCode('記事の新規投稿が完了しました。',204);
        }catch(Exception $e){
            return response()->messageAndStatusCode('記事の新規投稿に失敗しました。',500);
        }
    }

    public function updateArticleDetail(string $article_id,string $title,string $content){
        $article = Article::findOrFail($article_id);

        try {
            $article->title = $title;
            $article->content = $content;
            $article->save();
            return response()->messageAndStatusCode('記事の更新が完了しました。',204);
        }catch(Exception $e){
            return response()->messageAndStatusCode('記事の更新に失敗しました。',500);
        }
    }

    /**
     * 記事の削除処理(ソフトデリート)
     */
    public function deleteArticle($article_id){
        $article = Article::findOrFail($article_id);

        // 論理削除されているかをチェック
        if (!$article->trashed()) {
            try {
                $article->delete();
                return response()->messageAndStatusCode('記事の削除が完了しました。',204);
            }
            catch (Exception $e) {
                return response()->messageAndStatusCode('記事の削除に失敗しました',500);
            }
        } else {
            return response()->messageAndStatusCode('この記事はすでに削除されています。',400);
        }
    }
}