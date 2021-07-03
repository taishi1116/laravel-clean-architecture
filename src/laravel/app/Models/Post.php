<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Post extends Model
{
    use HasFactory,SoftDeletes;

    protected $table = 'posts';
    protected $primaryKey = 'post_id';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['user_id','title','content'];
}
