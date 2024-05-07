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
        Schema::table('modelo_equipamento', function (Blueprint $table) {
            $table->foreign(['marca_id_marca_equipamento'], 'fk_modelo_equipamento_marca1')->references(['id_marca_equipamento'])->on('marca_equipamento')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('modelo_equipamento', function (Blueprint $table) {
            $table->dropForeign('fk_modelo_equipamento_marca1');
        });
    }
};
