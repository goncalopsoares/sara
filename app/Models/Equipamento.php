<?php 

namespace App\Models;

use App\Models\Subcategoria;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Equipamento extends Model
{
    protected $table = 'equipamento';
    protected $primaryKey = 'id_equipamento';
    public $timestamps = false;

    protected $fillable = [
        'id_interno_equipamento', 
        'numero_serie_equipamento', 
        'numero_inventario_equipamento', 
        'data_aquisicao_equipamento', 
        'disponibilidade_equipamento', 
        'observacoes_equipamento', 
    ];

    public function requisicao():BelongsToMany
    {
        return $this->belongsToMany(
            Requisicao::class,
            'requisicao_has_equipamento',
            'equipamento_id_equipamento',
            'requisicao_id_requisicao',)
            ->withPivot('reportar_anomalias','comentarios','data_inicio_requisicao', 'data_fim_requisicao');
    }

    public function ucContexto(): BelongsToMany
    {
        return $this->belongsToMany(
            UcContexto::class,
            'equipamento_has_uc',
            'equipamento_id_equipamento',
            'uc_id_uc',)
            ->withPivot('kits_equipamento_id_kits_equipamento');
    }

    public function modeloEquipamento(): BelongsTo
    {
        return $this->belongsTo(
            ModeloEquipamento::class,
            'modelo_equipamento_id_modelo_equipamento',
            'id_modelo_equipamento',
        );
    }

    public function subCategoria(): BelongsToMany
    {
        return $this->belongsToMany(
            Subcategoria::class,
            'equipamento_has_sub_categoria',
            'equipamento_id_equipamento',
            'sub_categoria_id_sub_categoria',
        );
    }

    public function categoria(): BelongsToMany
    {
        return $this->belongsToMany(
            Categoria::class,
            'equipamento_has_categoria',
            'equipamento_id_equipamento',
            'categoria_id_categoria',
        );
    }

}