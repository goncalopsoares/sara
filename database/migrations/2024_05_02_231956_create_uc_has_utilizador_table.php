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
        Schema::create('uc_has_utilizador', function (Blueprint $table) {
            $table->integer('uc_id_uc_contexto')->index('fk_uc_has_utilizador_uc1_idx');
            $table->integer('utilizador_id_utilizador')->index('fk_uc_has_utilizador_utilizador1_idx');

            $table->primary(['uc_id_uc_contexto', 'utilizador_id_utilizador']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('uc_has_utilizador');
    }
};
