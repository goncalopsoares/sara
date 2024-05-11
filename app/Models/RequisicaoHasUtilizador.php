<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class RequisicaoHasUtilizador extends Pivot
{
   protected $table = 'requisicao_has_utilizador';
   public $timestamps = false;

   protected $fillable = [
       'requisicao_id_requisicao',
       'utilizador_id_utilizador',
       'role_utilizador',
       'pin_recolha',
       'pin_devolucao',
   ];
}
