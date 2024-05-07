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
        Schema::table('requisicao_has_aspeto_positivo_requisicao', function (Blueprint $table) {
            $table->foreign(['aspeto_positivo_requisicao_id_aspeto_positivo_requisicao'], 'fk_aspetos_positivos_requisicao_has_requisicao_aspetos_positi1')->references(['id_aspeto_positivo_requisicao'])->on('aspeto_positivo_requisicao')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['requisicao_id_requisicao'], 'fk_aspetos_positivos_requisicao_has_requisicao_requisicao1')->references(['id_requisicao'])->on('requisicao')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('requisicao_has_aspeto_positivo_requisicao', function (Blueprint $table) {
            $table->dropForeign('fk_aspetos_positivos_requisicao_has_requisicao_aspetos_positi1');
            $table->dropForeign('fk_aspetos_positivos_requisicao_has_requisicao_requisicao1');
        });
    }
};
