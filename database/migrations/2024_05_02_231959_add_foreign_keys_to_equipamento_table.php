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
        Schema::table('equipamento', function (Blueprint $table) {
            $table->foreign(['modelo_equipamento_id_modelo_equipamento'], 'fk_equipamento_modelo_equipamento1')->references(['id_modelo_equipamento'])->on('modelo_equipamento')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('equipamento', function (Blueprint $table) {
            $table->dropForeign('fk_equipamento_modelo_equipamento1');
        });
    }
};
