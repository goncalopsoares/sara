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
        Schema::create('requisicao', function (Blueprint $table) {
            $table->integer('id_requisicao', true)->unique('id_requisicao_unique');
            $table->string('nome_requisicao', 45);
            $table->mediumText('contexto_requisicao');
            $table->enum('tipo_requisicao', ['Equipamento', 'Espaço']);
            $table->integer('espaco_id_espaco')->nullable()->index('fk_requisicao_espaco1_idx');
            $table->mediumText('comentario_professor_requisicao')->nullable();
            $table->mediumText('comentario_sara_requisicao')->nullable();
            $table->integer('uc_contexto_id_uc_contexto')->index('fk_requisicao_uc1_idx');

            $table->primary(['id_requisicao']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('requisicao');
    }
};
