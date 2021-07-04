<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ArticleRequest;
use App\Repositories\Article\ArticleRepository;


class ArticleAPIController extends Controller
{
    private $article_repository;

    public function __construct(ArticleRepository $article_repository)
    {
        $this->article_repository = $article_repository;
    }

    public function index()
    {
        return $this->article_repository->getAllArticles();
    }

    public function show($article_id)
    {
        return $this->article_repository->getArticleDetail($article_id);
    }

    public function store(ArticleRequest $request)
    {
        $user_id =$request->input('user_id');
        $title =$request->input('title');
        $content =$request->input('content');
        return $this->article_repository->postNewArticle($user_id,$title,$content);
    }

    public function update($article_id,ArticleRequest $request)
    {
        $title =$request->input('title');
        $content =$request->input('content');
        return $this->article_repository->updateArticleDetail($article_id,$title,$content);
    }
    
    public function destroy($article_id)
    {
        return $this->article_repository->deleteArticle($article_id);
    }
}
