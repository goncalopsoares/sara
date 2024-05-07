<?php 

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ModeloEquipamento extends Model
{
    protected $table = 'modelo_equipamento';
    protected $primaryKey = 'id_modelo_equipamento';
    public $timestamps = false;

    protected $fillable = [
        'nome_modelo_equipamento', 
        'descricao_modelo_equipamento', 
        'imagem_modelo_equipamento', 
        'especificacoes_modelo_equipamento', 
        'aplicablidade_modelo_equipamento', 
        'cuidados_modelo_equipamento', 
    ];


public function marcaEquipamento()
{
    return $this->belongsTo(
        MarcaEquipamento::class, 
        'marca_equipamento_id_marca_equipamento', 
        'id_marca_equipamento');
}

public function equipamento()
{
    return $this->hasMany(
        Equipamento::class, 
        'modelo_equipamento_id_modelo_equipamento', 
        'id_modelo_equipamento');

}

public function compatibilidadeModeloEquipamento()
{
    return $this->belongsToMany(
        ModeloEquipamento::class,
        'compatibilidade_modelo_equipamento',
        'equipamento_1',
        'equipamento_2');
}

}