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
        Schema::create('equipamento', function (Blueprint $table) {
            $table->integer('id_equipamento', true)->unique('id_material_unique');
            $table->string('id_interno_equipamento', 30);
            $table->string('numero_serie_equipamento', 30)->nullable()->unique('numero_serie_material_unique');
            $table->integer('numero_inventario_equipamento')->nullable()->unique('numero_inventario_material_unique');
            $table->date('data_aquisicao_equipamento')->nullable();
            $table->enum('disponibilidade_equipamento', ['Disponível', 'Indisponível']);
            $table->tinyText('observacoes_equipamento')->nullable();
            $table->integer('modelo_equipamento_id_modelo_equipamento')->index('fk_equipamento_modelo_equipamento1_idx');

            $table->primary(['id_equipamento']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipamento');
    }
};
