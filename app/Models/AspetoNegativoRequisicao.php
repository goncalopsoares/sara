<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AspetoNegativoRequisicao extends Model
{
    protected $table = 'aspeto_negativo_requisicao';
    protected $primaryKey = 'id_aspeto_negativo_requisicao';
    public $timestamps = false;

    protected $fillable = [
        'nome_aspeto_negativo_requisicao', 
    ];

    public function requisicao() 
    {
        return $this-> belongsToMany(
            Requisicao::class,
            'requisicao_has_aspeto_negativo_requisicao',
            'requisicao_id_requisicao',
            'aspeto_negativo_requisicao_id_aspeto_negativo_requisicao',
        )->withDefault();
    }
}