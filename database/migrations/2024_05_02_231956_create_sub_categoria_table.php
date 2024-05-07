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
        Schema::create('sub_categoria', function (Blueprint $table) {
            $table->integer('id_sub_categoria', true)->unique('id_sub_categoria_unique');
            $table->string('nome_sub_categoria', 45);

            $table->primary(['id_sub_categoria']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sub_categoria');
    }
};
