<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Article extends Model
{
    use HasFactory,SoftDeletes;

    protected $table = 'articles';
    protected $primaryKey = 'article_id';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['article_id','user_id','title','content'];
}
