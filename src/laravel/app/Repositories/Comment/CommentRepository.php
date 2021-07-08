<?php

namespace App\Repositories\Comment;

use App\Models\Comment;
use \Exception;
use Illuminate\Support\Str;


class ArticleRepository implements CommentInterface {
    public function getArticleAllComments(string $article_id)
    {
        try {
            $comments = Comment::where('article_id',$article_id)->get();
            $response = array();

            foreach ($comments as $comment) {
                $extract_comment_info = ['comment_id' => $comment->comment_id,'user_id' => $comment->user_id,'content' => $comment->content,'created_at' => $comment->created_at,'updated_at' => $comment->updated_at];
                array_push($response,$extract_comment_info);
            }
            return response()->json(['comments' => $response],200);
        } 
        catch(Exception $e) {
            return response()->error('コメントの取得に失敗しました。',500);
        }
    }

    public function postArticleComment(string $article_id,string $user_id,string $content)
    {
        try {
            $comment = new Comment();
            $comment_id = Str::uuid();
            $comment->fill(['comment_id' => $comment_id,'article_id' => $article_id,'user_id' => $user_id,'content' => $content]);
            $comment->save();
            return response()->json(['message'=>'コメントの投稿が完了しました。'],204);
        }
        catch (Exception $e){
            return response()->json(['message'=>'コメントの投稿に失敗しました。'],500);
        }
    }

    public function updateArticleComments(string $article_id,string $user_id,string $content)
    {
        try {
            $comment = Comment::where('article_id',$article_id)->where('user_id',$user_id)->first();

            $comment->content = $content;
            $comment->save();
            return response()->json(['message' => 'コメントの更新が完了しました。'],204);
        } 
        catch(Exception $e)
        {
            return response()->error('コメントの取得に失敗しました。',500);
        }
    }
}
