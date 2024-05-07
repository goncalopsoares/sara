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
        Schema::table('requisicao_has_utilizador', function (Blueprint $table) {
            $table->foreign(['requisicao_id_requisicao'], 'fk_requisicao_has_utilizador_requisicao1')->references(['id_requisicao'])->on('requisicao')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['utilizador_id_utilizador'], 'fk_requisicao_has_utilizador_utilizador1')->references(['id_utilizador'])->on('utilizador')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('requisicao_has_utilizador', function (Blueprint $table) {
            $table->dropForeign('fk_requisicao_has_utilizador_requisicao1');
            $table->dropForeign('fk_requisicao_has_utilizador_utilizador1');
        });
    }
};
