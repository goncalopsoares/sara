<?php 

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Equipamento extends Model
{
    protected $table = 'equipamento';
    protected $primaryKey = 'id_equipamento';
    public $timestamps = false;

    protected $fillable = [
        'id_interno_equipamento', 
        'numero_serie_equipamento', 
        'numero_inventario_equipamento', 
        'data_aquisicao_equipamento', 
        'disponibilidade_equipamento', 
        'observacoes_equipamento', 
    ];
}