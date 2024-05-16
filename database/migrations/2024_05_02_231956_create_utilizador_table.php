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
        Schema::create('utilizador', function (Blueprint $table) {
            $table->integer('id_utilizador', true)->unique('id_utilizadores_unique');
            $table->string('nome_utilizador', 100);
            $table->string('email_utilizador', 100);
            $table->integer('numero_mecanografico_utilizador')->unique('numero_mecanografico_utilizador_unique');
            $table->boolean('tipo_utilizador');
            $table->string('avatar_utilizador', 45)->nullable();
            $table->string('password_utilizador', 100);

            $table->primary(['id_utilizador']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('utilizador');
    }
};
