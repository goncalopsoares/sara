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
        Schema::create('modelo_equipamento_has_modelo_equipamento', function (Blueprint $table) {
            $table->integer('camaras')->index('fk_modelo_equipamento_has_modelo_equipamento_modelo_equipam_idx1');
            $table->integer('objetivas')->index('fk_modelo_equipamento_has_modelo_equipamento_modelo_equipam_idx');

            $table->primary(['camaras', 'objetivas']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('modelo_equipamento_has_modelo_equipamento');
    }
};
