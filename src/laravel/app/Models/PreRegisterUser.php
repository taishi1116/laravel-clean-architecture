<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\PreRegisterUser
 *
 * @property int $id
 * @property string $token
 * @property string $mail
 * @property int $is_registered
 * @property string $created_at
 * @method static \Illuminate\Database\Eloquent\Builder|PreRegisterUser newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PreRegisterUser newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PreRegisterUser query()
 * @method static \Illuminate\Database\Eloquent\Builder|PreRegisterUser whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PreRegisterUser whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PreRegisterUser whereIsRegistered($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PreRegisterUser whereMail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PreRegisterUser whereToken($value)
 * @mixin \Eloquent
 */
class PreRegisterUser extends Model
{
    use HasFactory;

    protected $table = 'pre_register_user';
    protected $fillable = ['token','mail','created_at'];

    // created_atのみ存在するためfalseとする
    public $timestamps = false;
}
