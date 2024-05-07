<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notificacao extends Model
{
   protected $table = 'notificacao';
   protected $primaryKey = 'id_notificacao';
   public $timestamps = false;

   protected $fillable = [
       'descricao_notificacao',
       'data_notificacao',
       'hora_notificacao',
       'estado_notificacao',
   ];
   
   public function utilizador()
   {
       return $this->belongsTo(
           Utilizador::class, 
           'utilizador_id_utilizador', 
           'id_utilizador');
   }

}