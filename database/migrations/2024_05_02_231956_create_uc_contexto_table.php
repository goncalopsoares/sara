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
        Schema::create('uc_contexto', function (Blueprint $table) {
            $table->integer('id_uc_contexto', true)->unique('id_uc_unique');
            $table->string('nome_uc_contexto', 45);
            $table->string('sigla_uc_contexto', 10)->nullable();
            $table->string('icone_uc_contexto', 45);
            $table->integer('codigo_uc_contexto')->nullable();
            $table->tinyInteger('semestre_uc_contexto')->nullable();

            $table->primary(['id_uc_contexto']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('uc_contexto');
    }
};
