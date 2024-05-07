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
        Schema::table('requisicao_has_estado', function (Blueprint $table) {
            $table->foreign(['estado_id_estado'], 'fk_requisicao_has_estado_estado1')->references(['id_estado'])->on('estado')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['requisicao_id_requisicao'], 'fk_requisicao_has_estado_requisicao1')->references(['id_requisicao'])->on('requisicao')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('requisicao_has_estado', function (Blueprint $table) {
            $table->dropForeign('fk_requisicao_has_estado_estado1');
            $table->dropForeign('fk_requisicao_has_estado_requisicao1');
        });
    }
};
