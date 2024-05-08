<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Utilizador extends Model
{
    protected $table = 'utilizador';
    protected $primaryKey = 'id_utilizador';
    public $timestamps = false;

    protected $fillable = [
        'nome_utilizador',
        'email_utilizador',
        'numero_mecanografico_utilizador',
        'tipo_utilizador',
        'avatar_utilizador',
    ];

public function anomaliaPlataforma()
{
    return $this->hasMany(
        AnomaliaPlataforma::class, 
        'utilizador_id_utilizador', 
        'id_utilizador');
}

public function notificacao()
{
    return $this->hasMany(
        Notificacao::class, 
        'utilizador_id_utilizador', 
        'id_utilizador');

}

public function requisicao()
{
    return $this->belongsToMany(
        Requisicao::class, 
        'requisicao_has_utilizador', 
        'requisicao_id_requisicao',
        'utilizador_id_utilizador'
    ) -> withPivot('role_utilizador');
}

public function ucContexto()
{
    return $this->hasMany(
        UcContexto::class, 
        'uc_contexto_id_uc_contexto', 
        'id_uc_contexto',
    );
}

public function equipamento() 
{
    return $this->hasMany(
        Equipamento::class,
        'utilizador_id_utilizador',
        'id_utilizador',
    );
}
}

