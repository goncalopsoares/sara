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
        Schema::create('requisicao_has_utilizador', function (Blueprint $table) {
            $table->integer('requisicao_id_requisicao')->index('fk_requisicao_has_utilizador_requisicao1_idx');
            $table->integer('utilizador_id_utilizador')->index('fk_requisicao_has_utilizador_utilizador1_idx');
            $table->boolean('role_utilizador');

            $table->primary(['requisicao_id_requisicao', 'utilizador_id_utilizador']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('requisicao_has_utilizador');
    }
};
