<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model
{
    use HasFactory;

    use HasFactory,SoftDeletes;

    protected $table = 'comments';
    protected $primaryKey = 'comment_id';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['comment_id','article_id','user_id','content'];
}
