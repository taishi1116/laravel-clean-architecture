<?php

namespace App\Repositories\Article;

use App\Models\Article;
use App\Models\User;
use \Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class ArticleRepository implements ArticleInterface
{
    public function getArticlesWithPagination()
    {
        return DB::table('articles')->select('article_id', 'title', 'content', 'created_at', 'updated_at')->paginate(15);
    }

    public function getArticleDetail($article_id)
    {
        $article = Article::findOrFail($article_id);
        $poster_user = User::findOrFail($article->user_id);
        return ["article_id" =>$article->article_id,"title" => $article->title,"content" => $article->content,"user_name" =>$poster_user->name,"created_at" =>$article->created_at,"updated_at" =>$article->updated_at,"deleted_at" =>$article->deleted_at];
    }


    public function postNewArticle(string $title, string $content)
    {
        $article = new Article();

        // ログインユーザーのみが投稿できるので、Auth::id()から取得し外部注入を防ぐ
        $user_id = Auth::id();
        $article_id = Str::uuid();
        $article->fill(['article_id' => $article_id,'user_id' => $user_id,'title' => $title,'content' => $content]);
        $article->save();

        return ["article_id" => $article_id];
    }

    public function updateArticleDetail(string $article_id, string $title, string $content)
    {
        $article = Article::findOrFail($article_id);

        $article->title = $title;
        $article->content = $content;
        return $article->save();
    }

    /**
     * 記事の削除処理(ソフトデリート)
     * ソフトデリート済のモデルは除外されるため、例外が発生する = 記事が見つからない振る舞いとなる
     *
     */
    public function deleteArticle($article_id)
    {
        $article = Article::findOrFail($article_id);
        return $article->delete();
    }
}
