<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Utilizador extends Model
{

    use HasApiTokens;

    protected $table = 'utilizador';
    protected $primaryKey = 'id_utilizador';
    public $timestamps = false;

    protected $fillable = [
        'nome_utilizador',
        'email_utilizador',
        'numero_mecanografico_utilizador',
        'tipo_utilizador',
        'avatar_utilizador',
        'password_utilizador',
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
    ) -> withPivot('role_utilizador', 'pin_recolha', 'pin_devolucao');
}

public function ucContexto()
{
    return $this->belongsToMany(
        UcContexto::class, 
        'uc_has_utilizador',
        'uc_id_uc_contexto', 
        'utilizador_id_utilizador',
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

