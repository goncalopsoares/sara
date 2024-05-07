<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class RequisicaoHasEquipamento extends Pivot
{
    protected $table = 'requisicao_has_equipamento';
    public $timestamps = false;

    protected $fillable = [
        'reportar_anomalias',
        'comentarios',
        'data_inicio_requisicao',
        'data_fim_requisicao',
    ];
}