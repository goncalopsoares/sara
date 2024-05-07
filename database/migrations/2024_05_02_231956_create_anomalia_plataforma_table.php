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
        Schema::create('anomalia_plataforma', function (Blueprint $table) {
            $table->integer('id_anomalia_plataforma', true)->unique('id_anomalia_unique');
            $table->mediumText('descricao_anomalia_plataforma');
            $table->enum('estado_anomalia_plataforma', ['Resolvida', 'Por resolver']);
            $table->integer('utilizador_id_utilizador')->index('fk_anomalia_utilizador1_idx');

            $table->primary(['id_anomalia_plataforma']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('anomalia_plataforma');
    }
};
