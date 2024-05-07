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
        Schema::create('modelo_equipamento', function (Blueprint $table) {
            $table->integer('id_modelo_equipamento', true)->unique('id_modelo_equipamento_unique');
            $table->string('nome_modelo_equipamento', 45);
            $table->mediumText('descricao_modelo_equipamento')->nullable();
            $table->string('imagem_modelo_equipamento', 45)->nullable();
            $table->mediumText('especificacoes_modelo_equipamento')->nullable();
            $table->mediumText('aplicablidade_modelo_equipamento')->nullable();
            $table->mediumText('cuidados_modelo_equipamento')->nullable();
            $table->integer('marca_id_marca_equipamento')->index('fk_modelo_equipamento_marca1_idx');

            $table->primary(['id_modelo_equipamento']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('modelo_equipamento');
    }
};
