<?php
namespace App\Repositories\Article;

interface ArticleInterface
{
    public function getArticlesWithPagination();
    public function getArticleDetail($article_id);
    public function postNewArticle(string $user_id, string $title, string $content);
    public function updateArticleDetail(string $article_id, string $title, string $content);
    public function deleteArticle($article_id);
}
