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
        Schema::create('equipamento_has_uc', function (Blueprint $table) {
            $table->integer('equipamento_id_equipamento')->index('fk_material_has_uc_material1_idx');
            $table->integer('uc_id_uc')->index('fk_material_has_uc_uc1_idx');
            $table->integer('kits_equipamento_id_kits_equipamento')->nullable()->index('fk_material_has_uc_kits_material1_idx');

            $table->primary(['equipamento_id_equipamento', 'uc_id_uc']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipamento_has_uc');
    }
};
