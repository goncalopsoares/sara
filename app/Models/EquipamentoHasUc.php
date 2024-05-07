<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class EquipamentoHasUc extends Pivot
{
    protected $table = 'equipamento_has_uc';
    public $timestamps = false;

    protected $fillable = [
        'kits_equipamento_id_kits_equipamento',
    ];
}