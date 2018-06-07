<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('counts', function (Blueprint $table) {
            $table->increments('id');
            $table->bigInteger('count_num')->default(0);
            $table->timestamps();
        });
        DB::table('counts')->insert([
          'id' => 1,
          'count_num' => 0,
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('counts');
    }
}
