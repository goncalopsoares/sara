<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AnomaliaPlataforma extends Model
{
    protected $table = 'anomalia_plataforma';
    protected $primaryKey = 'id_anomalia_plataforma';
    public $timestamps = false;

    protected $fillable = [
        'descricao_anomalia_plataforma',
        'estado_anomalia_plataforma',
        'data_anomalia_plataforma',
    ];

public function utilizador()
{
    return $this->belongsTo(
        Utilizador::class, 
        'utilizador_id_utilizador', 
        'id_utilizador');

}
}