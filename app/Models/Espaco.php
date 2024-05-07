<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Espaco extends Model
{
   protected $table = 'espaco';
   protected $primaryKey = 'id_espaco';

   protected $fillable = [
       'nome_espaco',
       'sala_espaco',
   ];

   public function requisicao() 
   {
       return $this-> belongsTo(
           Requisicao::class,
           'espaco_id_espaco',
           'id_espaco',
       )->withDefault();
}
}