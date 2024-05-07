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
        Schema::create('equipamento_has_categoria', function (Blueprint $table) {
            $table->integer('equipamento_id_equipamento')->index('fk_equipamento_has_categoria_equipamento1_idx');
            $table->integer('categoria_id_categoria')->index('fk_equipamento_has_categoria_categoria1_idx');

            $table->primary(['equipamento_id_equipamento', 'categoria_id_categoria']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipamento_has_categoria');
    }
};
