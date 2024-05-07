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
        Schema::table('modelo_equipamento_has_modelo_equipamento', function (Blueprint $table) {
            $table->foreign(['camaras'], 'fk_modelo_equipamento_has_modelo_equipamento_modelo_equipamen1')->references(['id_modelo_equipamento'])->on('modelo_equipamento')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['objetivas'], 'fk_modelo_equipamento_has_modelo_equipamento_modelo_equipamen2')->references(['id_modelo_equipamento'])->on('modelo_equipamento')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('modelo_equipamento_has_modelo_equipamento', function (Blueprint $table) {
            $table->dropForeign('fk_modelo_equipamento_has_modelo_equipamento_modelo_equipamen1');
            $table->dropForeign('fk_modelo_equipamento_has_modelo_equipamento_modelo_equipamen2');
        });
    }
};
