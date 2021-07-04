<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ArticleRequest;
use Illuminate\Requests\Article\ArticleRepository;

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
        $this->article_repository->getArticleDetail($article_id);
    }

    public function store(ArticleRequest $request)
    {
        $user_id =$request->input('user_id');
        $title =$request->input('title');
        $content =$request->input('content');
        $this->article_repository->getArticleDetail($user_id,$title,$content);
    }

    public function update($article_id,ArticleRequest $request)
    {
        $title =$request->input('title');
        $content =$request->input('content');
        $this->article_repository->getArticleDetail($article_id,$title,$content);
    }
    
    public function destroy($article_id)
    {
        $this->article_repository->getArticleDetail($article_id);
    }
}
