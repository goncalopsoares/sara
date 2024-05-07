<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MarcaEquipamento extends Model
{
    protected $table = 'marca_equipamento';
    protected $primaryKey = 'id_marca_equipamento';
    public $timestamps = false;

    protected $fillable = [
        'nome_marca_equipamento', 
    ];
}