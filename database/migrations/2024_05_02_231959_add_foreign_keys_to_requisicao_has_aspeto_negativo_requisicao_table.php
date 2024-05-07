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
        Schema::table('requisicao_has_aspeto_negativo_requisicao', function (Blueprint $table) {
            $table->foreign(['aspeto_negativo_requisicao_id_aspeto_negativo_requisicao'], 'fk_requisicao_has_aspetos_negativos_requisicao_aspetos_negati1')->references(['id_aspeto_negativo_requisicao'])->on('aspeto_negativo_requisicao')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['requisicao_id_requisicao'], 'fk_requisicao_has_aspetos_negativos_requisicao_requisicao1')->references(['id_requisicao'])->on('requisicao')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('requisicao_has_aspeto_negativo_requisicao', function (Blueprint $table) {
            $table->dropForeign('fk_requisicao_has_aspetos_negativos_requisicao_aspetos_negati1');
            $table->dropForeign('fk_requisicao_has_aspetos_negativos_requisicao_requisicao1');
        });
    }
};
