<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Estado extends Model
{
    protected $table = 'estado';
    protected $primaryKey = 'id_estado';
    public $timestamps = false;

    protected $fillable = [
        'nome_estado',
    ];

    public function requisicao() 
    {
        return $this-> belongsToMany(
            Requisicao::class,
            'requisicao_has_estado',
            'requisicao_id_requisicao',
            'estado_id_estado',
        )->withPivot('data_estado');
    }

}