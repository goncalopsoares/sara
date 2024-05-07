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
        Schema::create('aspeto_negativo_requisicao', function (Blueprint $table) {
            $table->integer('id_aspeto_negativo_requisicao', true)->unique('id_aspetos_positivos_requisicao_unique');
            $table->string('nome_aspeto_negativo_requisicao', 45);

            $table->primary(['id_aspeto_negativo_requisicao']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('aspeto_negativo_requisicao');
    }
};
