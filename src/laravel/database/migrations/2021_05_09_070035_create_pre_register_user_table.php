<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePreRegisterUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pre_register_user', function (Blueprint $table) {
            $table->id();
            $table->string('token');
            $table->string('mail');
            //boolean()ではfalse:0,true:1という扱いになる
            $table->boolean('is_registered')->default(0);
            $table->date('created_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pre_register_user');
    }
}
