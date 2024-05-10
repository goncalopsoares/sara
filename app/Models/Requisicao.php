<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Requisicao extends Model
{
    protected $table = 'requisicao';
    protected $primaryKey = 'id_requisicao';
    public $timestamps = false;

    protected $fillable = [
        'nome_requisicao',
        'contexto_requisicao',
        'tipo_requsicao',
        'comentario_professor_requisicao',
        'comentario_sara_requisicao',
        'comentario_aluno_requisicao',
        'avaliacao_requisicao',
    ];

    public function espaco() 
    {
        return $this-> hasMany(
            Espaco::class,
            'espaco_id_espaco',
            'id_espaco',
        )->withDefault();
    }

    public function estado() 
    {
        return $this-> belongsToMany(
            Estado::class,
            'requisicao_has_estado',
            'requisicao_id_requisicao',
            'estado_id_estado',
        )->withPivot('data_estado');
    }

    public function utilizador() 
    {
        return $this-> belongsToMany(
            Utilizador::class,
            'requisicao_has_utilizador',
            'requisicao_id_requisicao',
            'utilizador_id_utilizador',
        );
    }

    public function ucContexto()
    {
        return $this-> hasMany(
            Uc::class,
            'uc_contexto_id_uc_contexto',
            'id_uc_contexto',
        );
    }        
    
    public function equipamento() 
    {
        return $this->belongsToMany(
            Equipamento::class,
            'requisicao_has_equipamento',
            'requisicao_id_requisicao',
            'equipamento_id_equipamento',
        )->withPivot('reportar_anomalias', 'comentarios', 'data_inicio_requisicao', 'data_fim_requisicao' );
    }

    public function aspetoNegativoRequisicao()
    {
        return $this-> belongsToMany(
            AspetoNegativoRequisicao::class,
            'requisicao_has_aspeto_negativo_requisicao',
            'requisicao_id_requisicao',
            'aspeto_negativo_requisicao_id_aspeto_negativo_requisicao',
        )->withDefault();
    }

    public function aspetoPositivoRequisicao()
    {
        return $this-> belongsToMany(
            AspetoPositivoRequisicao::class,
            'requisicao_has_aspeto_positivo_requisicao',
            'requisicao_id_requisicao',
            'aspeto_positivo_requisicao_id_aspeto_positivo_requisicao',
        )->withDefault();
    }

}