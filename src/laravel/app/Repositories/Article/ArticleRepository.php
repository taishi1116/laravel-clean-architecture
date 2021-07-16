<?php

namespace App\Repositories\Article;

use App\Models\Article;
use \Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class ArticleRepository implements ArticleInterface
{
    public function getArticlesWithPagination()
    {
        return DB::table('articles')->select('article_id', 'title', 'content', 'created_at', 'updated_at')->simplePaginate(15);
    }

    public function getArticleDetail($article_id)
    {
        $article = Article::findOrFail($article_id);
        return $article;
    }


    public function postNewArticle(string $title, string $content)
    {
        $article = new Article();

        // ログインユーザーのみが投稿できるので、Auth::id()から取得し外部注入を防ぐ
        $user_id = Auth::id();
        $article_id = Str::uuid();
        $article->fill(['article_id' => $article_id,'user_id' => $user_id,'title' => $title,'content' => $content]);
        return $article->save();
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
