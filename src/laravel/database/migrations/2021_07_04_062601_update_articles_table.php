<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateArticlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->timestamps();
            $table->softDeletes();
            $table->renameColumn('post_id','article_id');
            $table->dropColumn('post_time');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropTimestamps();	
            $table->dropSoftDeletes();
            $table->renameColumn('article_id','post_id');
            $table->date('post_time');
        });
    }
}
