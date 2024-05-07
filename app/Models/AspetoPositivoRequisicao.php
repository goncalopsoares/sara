<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AspetoNegativoRequisicao extends Model
{
    protected $table = 'aspeto_positivo_requisicao';
    protected $primaryKey = 'id_aspeto_positivo_requisicao';
    public $timestamps = false;

    protected $fillable = [
        'nome_aspeto_positivo_requisicao', 
    ];

    public function requisicao() 
    {
        return $this-> belongsToMany(
            Requisicao::class,
            'requisicao_has_aspeto_positivo_requisicao',
            'requisicao_id_requisicao',
            'aspeto_positivo_requisicao_id_aspeto_positivo_requisicao',
        )->withDefault();
    }
}