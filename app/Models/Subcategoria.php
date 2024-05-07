<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    protected $table = 'sub_categoria';
    protected $primaryKey = 'id_sub_categoria';
    public $timestamps = false;

    protected $fillable = [
        'nome_sub_categoria', 
    ];

    public function equipamento() 
    {
        return $this-> belongsToMany(
            Equipamento::class,
            'equipamento_has_sub_categoria',
            'equipamento_id_equipamento',
            'categoria_id_sub_categoria',
        );
    }
}