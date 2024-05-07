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
        Schema::create('espaco', function (Blueprint $table) {
            $table->integer('id_espaco', true)->unique('id_espaco_unique');
            $table->string('nome_espaco', 45)->nullable();
            $table->string('sala_espaco', 45);

            $table->primary(['id_espaco']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('espaco');
    }
};
