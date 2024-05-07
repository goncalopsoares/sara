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
        Schema::create('requisicao_has_aspeto_positivo_requisicao', function (Blueprint $table) {
            $table->integer('requisicao_id_requisicao')->index('fk_aspetos_positivos_requisicao_has_requisicao_requisicao1_idx');
            $table->integer('aspeto_positivo_requisicao_id_aspeto_positivo_requisicao')->index('fk_aspetos_positivos_requisicao_has_requisicao_aspetos_posi_idx');

            $table->primary(['requisicao_id_requisicao', 'aspeto_positivo_requisicao_id_aspeto_positivo_requisicao']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('requisicao_has_aspeto_positivo_requisicao');
    }
};
