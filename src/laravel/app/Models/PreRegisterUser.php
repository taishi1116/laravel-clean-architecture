<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PreRegisterUser extends Model
{
    protected $table = 'pre_register_user';
    protected $fillable = ['token','mail','created_at'];

    // created_atのみ存在するためfalseとする
    public $timestamps = false;
}
