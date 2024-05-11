<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\AspetoPositivoRequisicao;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Requisicao extends Model
{
    protected $table = 'requisicao';
    protected $primaryKey = 'id_requisicao';
    public $timestamps = false;

    protected $fillable = [
        'nome_requisicao',
        'contexto_requisicao',
        'tipo_requisicao',
        'comentario_professor_requisicao',
        'comentario_sara_requisicao',
        'comentario_aluno_requisicao',
        'avaliacao_requisicao',
        'uc_contexto_id_uc_contexto',
    ];

    public function espaco(): HasMany
    {
        return $this->hasMany(
            Espaco::class,
            'espaco_id_espaco',
            'id_espaco',
        )->withDefault();
    }

    public function estado(): BelongsToMany
    {
        return $this->belongsToMany(
            Estado::class,
            'requisicao_has_estado',
            'requisicao_id_requisicao',
            'estado_id_estado',
        )->withPivot('data_estado');
    }

    public function utilizador(): BelongsToMany
    {
        return $this->belongsToMany(
            Utilizador::class,
            'requisicao_has_utilizador',
            'requisicao_id_requisicao',
            'utilizador_id_utilizador',
        )->withPivot('role_utilizador', 'pin_recolha', 'pin_devolucao');
    }

    public function ucContexto(): hasMany
    {
        return $this->hasMany(
            UcContexto::class,
            'uc_contexto_id_uc_contexto',
            'id_uc_contexto',
        );
    }

    public function equipamento(): BelongsToMany
    {
        return $this->belongsToMany(
            Equipamento::class,
            'requisicao_has_equipamento',
            'requisicao_id_requisicao',
            'equipamento_id_equipamento',
        )->withPivot('reportar_anomalias', 'comentarios', 'data_inicio_requisicao', 'data_fim_requisicao');
    }

    public function aspetoNegativoRequisicao():BelongsToMany    
    {
        return $this->belongsToMany(
            AspetoNegativoRequisicao::class,
            'requisicao_has_aspeto_negativo_requisicao',
            'requisicao_id_requisicao',
            'aspeto_negativo_requisicao_id_aspeto_negativo_requisicao',
        )->withDefault();
    }

    public function aspetoPositivoRequisicao(): BelongsToMany
    {
        return $this->belongsToMany(
            AspetoPositivoRequisicao::class,
            'requisicao_has_aspeto_positivo_requisicao',
            'requisicao_id_requisicao',
            'aspeto_positivo_requisicao_id_aspeto_positivo_requisicao',
        )->withDefault();
    }
}
