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
        Schema::create('marca_equipamento', function (Blueprint $table) {
            $table->integer('id_marca_equipamento', true)->unique('id_marca_equipamento_unique');
            $table->string('nome_marca_equipamento', 45);

            $table->primary(['id_marca_equipamento']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('marca_equipamento');
    }
};
