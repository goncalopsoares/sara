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
        Schema::table('anomalia_plataforma', function (Blueprint $table) {
            $table->foreign(['utilizador_id_utilizador'], 'fk_anomalia_utilizador1')->references(['id_utilizador'])->on('utilizador')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('anomalia_plataforma', function (Blueprint $table) {
            $table->dropForeign('fk_anomalia_utilizador1');
        });
    }
};
