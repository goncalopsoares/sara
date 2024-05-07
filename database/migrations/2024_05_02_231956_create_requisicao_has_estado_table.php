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
        Schema::create('requisicao_has_estado', function (Blueprint $table) {
            $table->integer('requisicao_id_requisicao')->index('fk_requisicao_has_estado_requisicao1_idx');
            $table->integer('estado_id_estado')->index('fk_requisicao_has_estado_estado1_idx');
            $table->timestamp('data_estado')->useCurrentOnUpdate()->useCurrent();

            $table->primary(['requisicao_id_requisicao', 'estado_id_estado']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('requisicao_has_estado');
    }
};
