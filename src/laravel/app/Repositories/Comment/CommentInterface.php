<?php
namespace App\Repositories\Comment;


interface CommentInterface {
    public function getArticleAllComments(string $article_id);
    public function postArticleComment(string $article_id,string $user_id,string $content);
    public function updateArticleComments(string $article_id,string $user_id,string $content);
}