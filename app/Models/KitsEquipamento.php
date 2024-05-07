<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KitsEquipamento extends Model
{
    protected $table = 'kits_equipamento';
    protected $primaryKey = 'id_kits_equipamento';
    public $timestamps = false;

    protected $fillable = [
        'nome_kits_equipamento',
    ];

    public function equipamentoHasUc() {
        return $this->belogsTo(
            EquipamentoHasUc::class,
            'kits_equipamento_id_kits_equipamento',
            'id_kits_equipamento',
        );
    }
}