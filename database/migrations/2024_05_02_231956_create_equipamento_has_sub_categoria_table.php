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
        Schema::create('equipamento_has_sub_categoria', function (Blueprint $table) {
            $table->integer('equipamento_id_equipamento')->index('fk_sub_categoria_has_equipamento_equipamento1_idx');
            $table->integer('sub_categoria_id_sub_categoria')->index('fk_sub_categoria_has_equipamento_sub_categoria1_idx');

            $table->primary(['equipamento_id_equipamento', 'sub_categoria_id_sub_categoria']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipamento_has_sub_categoria');
    }
};
