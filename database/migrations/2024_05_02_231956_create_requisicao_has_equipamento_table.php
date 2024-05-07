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
        Schema::create('requisicao_has_equipamento', function (Blueprint $table) {
            $table->integer('requisicao_id_requisicao')->index('fk_material_has_requisicao_requisicao1_idx');
            $table->integer('equipamento_id_equipamento')->index('fk_material_has_requisicao_material1_idx');
            $table->mediumText('reportar_anomalias')->nullable();
            $table->mediumText('comentarios')->nullable();
            $table->dateTime('data_inicio_requisicao');
            $table->dateTime('data_fim_requisicao');

            $table->primary(['requisicao_id_requisicao', 'equipamento_id_equipamento']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('requisicao_has_equipamento');
    }
};
