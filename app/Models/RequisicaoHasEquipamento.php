<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class RequisicaoHasEquipamento extends Pivot
{
    protected $table = 'requisicao_has_equipamento';
    public $timestamps = false;

    protected $fillable = [
        'requisicao_id_requisicao',
        'equipamento_id_equipamento',
        'reportar_anomalias',
        'comentarios',
        'data_inicio_requisicao',
        'data_fim_requisicao',
    ];
}