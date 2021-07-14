<?php

namespace App\Repositories\Article;

use App\Models\Article;
use \Exception;
use Illuminate\Support\Str;

class ArticleRepository implements ArticleInterface
{
    public function getArticlesWithPagination()
    {
        return Article::simplePaginate(15);
    }

    public function getArticleDetail($article_id)
    {
        $article = Article::findOrFail($article_id);
        return $article;
    }


    public function postNewArticle(string $user_id, string $title, string $content)
    {
        $article = new Article();
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
