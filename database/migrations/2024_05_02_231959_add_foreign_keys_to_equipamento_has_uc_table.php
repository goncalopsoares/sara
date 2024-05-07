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
        Schema::table('equipamento_has_uc', function (Blueprint $table) {
            $table->foreign(['kits_equipamento_id_kits_equipamento'], 'fk_material_has_uc_kits_material1')->references(['id_kits_equipamento'])->on('kits_equipamento')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['equipamento_id_equipamento'], 'fk_material_has_uc_material1')->references(['id_equipamento'])->on('equipamento')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['uc_id_uc'], 'fk_material_has_uc_uc1')->references(['id_uc_contexto'])->on('uc_contexto')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('equipamento_has_uc', function (Blueprint $table) {
            $table->dropForeign('fk_material_has_uc_kits_material1');
            $table->dropForeign('fk_material_has_uc_material1');
            $table->dropForeign('fk_material_has_uc_uc1');
        });
    }
};
