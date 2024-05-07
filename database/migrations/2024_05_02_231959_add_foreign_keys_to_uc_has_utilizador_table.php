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
        Schema::table('uc_has_utilizador', function (Blueprint $table) {
            $table->foreign(['uc_id_uc_contexto'], 'fk_uc_has_utilizador_uc1')->references(['id_uc_contexto'])->on('uc_contexto')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['utilizador_id_utilizador'], 'fk_uc_has_utilizador_utilizador1')->references(['id_utilizador'])->on('utilizador')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('uc_has_utilizador', function (Blueprint $table) {
            $table->dropForeign('fk_uc_has_utilizador_uc1');
            $table->dropForeign('fk_uc_has_utilizador_utilizador1');
        });
    }
};
