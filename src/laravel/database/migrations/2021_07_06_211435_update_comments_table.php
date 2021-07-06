<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // カラムの追加,削除とリネーム
        Schema::table('comments', function (Blueprint $table) {
            $table->renameColumn('post_id','article_id');
            $table->timestamps();
            $table->softDeletes();
            $table->dropColumn('comment_time');
        });

        // 型の変更
        Schema::table('comments', function (Blueprint $table) {
            $table->uuid('article_id')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // カラムの追加,削除とリネーム
        Schema::table('articles', function (Blueprint $table) {
            $table->renameColumn('article_id','post_id');
            $table->dropTimestamps();	
            $table->dropSoftDeletes();
            $table->date('comment_time');
        });

        // 型の変更
        Schema::table('comments', function (Blueprint $table) {
            $table->string('article_id')->change();
        });
    }
}
