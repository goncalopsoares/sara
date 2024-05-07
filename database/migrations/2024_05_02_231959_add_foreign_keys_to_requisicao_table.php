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
        Schema::table('requisicao', function (Blueprint $table) {
            $table->foreign(['espaco_id_espaco'], 'fk_requisicao_espaco1')->references(['id_espaco'])->on('espaco')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['uc_contexto_id_uc_contexto'], 'fk_requisicao_uc1')->references(['id_uc_contexto'])->on('uc_contexto')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('requisicao', function (Blueprint $table) {
            $table->dropForeign('fk_requisicao_espaco1');
            $table->dropForeign('fk_requisicao_uc1');
        });
    }
};
