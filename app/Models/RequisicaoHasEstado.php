<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class RequisicaoHasEstado extends Pivot
{
   protected $table = 'requisicao_has_estado';
   public $timestamps = false;

    protected $fillable = [
         'data_estado',
    ];

}