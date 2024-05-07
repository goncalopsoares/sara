<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class RequisicaoHasUtilizador extends Pivot
{
   protected $table = 'requisicao_has_utilizador';
   public $timestamps = false;

   protected $fillable = [
       'role_utilizador',
   ];
}
