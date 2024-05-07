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
        Schema::create('requisicao_has_aspeto_negativo_requisicao', function (Blueprint $table) {
            $table->integer('requisicao_id_requisicao')->index('fk_requisicao_has_aspetos_negativos_requisicao_requisicao1_idx');
            $table->integer('aspeto_negativo_requisicao_id_aspeto_negativo_requisicao')->index('fk_requisicao_has_aspetos_negativos_requisicao_aspetos_nega_idx');

            $table->primary(['requisicao_id_requisicao', 'aspeto_negativo_requisicao_id_aspeto_negativo_requisicao']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('requisicao_has_aspeto_negativo_requisicao');
    }
};
