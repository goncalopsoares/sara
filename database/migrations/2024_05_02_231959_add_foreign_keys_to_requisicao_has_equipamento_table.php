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
        Schema::table('requisicao_has_equipamento', function (Blueprint $table) {
            $table->foreign(['equipamento_id_equipamento'], 'fk_material_has_requisicao_material1')->references(['id_equipamento'])->on('equipamento')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['requisicao_id_requisicao'], 'fk_material_has_requisicao_requisicao1')->references(['id_requisicao'])->on('requisicao')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('requisicao_has_equipamento', function (Blueprint $table) {
            $table->dropForeign('fk_material_has_requisicao_material1');
            $table->dropForeign('fk_material_has_requisicao_requisicao1');
        });
    }
};
