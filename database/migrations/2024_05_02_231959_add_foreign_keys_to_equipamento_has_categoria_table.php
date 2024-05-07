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
        Schema::table('equipamento_has_categoria', function (Blueprint $table) {
            $table->foreign(['categoria_id_categoria'], 'fk_equipamento_has_categoria_categoria1')->references(['id_categoria'])->on('categoria')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['equipamento_id_equipamento'], 'fk_equipamento_has_categoria_equipamento1')->references(['id_equipamento'])->on('equipamento')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('equipamento_has_categoria', function (Blueprint $table) {
            $table->dropForeign('fk_equipamento_has_categoria_categoria1');
            $table->dropForeign('fk_equipamento_has_categoria_equipamento1');
        });
    }
};
