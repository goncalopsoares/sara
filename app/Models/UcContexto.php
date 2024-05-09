<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UcContexto extends Model
{
    protected $table = 'uc_contexto';
    protected $primaryKey = 'id_uc_contexto';
    public $timestamps = false;

    protected $fillable = [
        'nome_uc_contexto',
        'sigla_uc_contexto',
        'icone_uc_contexto',
        'codigo_uc_contexto',
        'semestre_uc_contexto',
    ];

    public function requisicao() 
    {
        return $this-> belongsTo(
            Requisicao::class,
            'uc_contexto_id_uc_contexto',
            'id_uc_contexto',
        );
    }

    public function equipamento()
    {
        return $this-> belongsToMany(
        Equipamento::class,
        'equipamento_has_uc_contexto',
        'equipamento_id_equipamento',
        'uc_id_uc_contexto',
        )->withPivot('kits_equipamento_id_kits_equipamento');
    }

    public function utilizador()
    {
        return $this-> belongsToMany(
        Utilizador::class,
        'uc_has_utilizador',
        'uc_id_uc_contexto',
        'utilizador_id_utilizador',
        );
    }

}