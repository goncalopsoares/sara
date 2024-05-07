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
        Schema::table('equipamento_has_sub_categoria', function (Blueprint $table) {
            $table->foreign(['equipamento_id_equipamento'], 'fk_sub_categoria_has_equipamento_equipamento1')->references(['id_equipamento'])->on('equipamento')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['sub_categoria_id_sub_categoria'], 'fk_sub_categoria_has_equipamento_sub_categoria1')->references(['id_sub_categoria'])->on('sub_categoria')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('equipamento_has_sub_categoria', function (Blueprint $table) {
            $table->dropForeign('fk_sub_categoria_has_equipamento_equipamento1');
            $table->dropForeign('fk_sub_categoria_has_equipamento_sub_categoria1');
        });
    }
};
