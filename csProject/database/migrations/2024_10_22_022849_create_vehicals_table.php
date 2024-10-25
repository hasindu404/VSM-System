<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vehicals', function (Blueprint $table) {
            $table->id('vehicalid');
            $table->string('brand');
            $table->integer('year');
            $table->String('Catagory');
            $table->date('last_service_date');
            $table->string('colour');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicals');
    }
};
