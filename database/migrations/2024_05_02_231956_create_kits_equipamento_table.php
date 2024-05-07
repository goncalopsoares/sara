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
        Schema::create('kits_equipamento', function (Blueprint $table) {
            $table->integer('id_kits_equipamento', true)->unique('id_kits_material_unique');
            $table->string('nome_kits_equipamento', 45);

            $table->primary(['id_kits_equipamento']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kits_equipamento');
    }
};
