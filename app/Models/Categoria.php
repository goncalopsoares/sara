<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    protected $table = 'categoria';
    protected $primaryKey = 'id_categoria';
    public $timestamps = false;

    protected $fillable = [
        'nome_categoria', 
    ];

    public function equipamento() 
    {
        return $this-> belongsToMany(
            Equipamento::class,
            'equipamento_has_categoria',
            'equipamento_id_equipamento',
            'categoria_id_categoria',
        );
    }
}