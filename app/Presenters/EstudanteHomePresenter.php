<?php

namespace App\Presenters;

use App\Models\Requisicao;

class EstudanteHomePresenter
{
    public function getEstudanteHome($id)
    {
        $query = Requisicao::join('requisicao_has_utilizador', 'requisicao_has_utilizador.requisicao_id_requisicao', '=', 'requisicao.id_requisicao')
        ->join('utilizador', 'utilizador.id_utilizador', '=', 'requisicao_has_utilizador.utilizador_id_utilizador')
        ->leftJoin('requisicao_has_estado', 'requisicao_has_estado.requisicao_id_requisicao', '=', 'requisicao.id_requisicao')
        ->leftJoin('estado', 'requisicao_has_estado.estado_id_estado', '=', 'estado.id_estado')
        ->leftJoin('uc_contexto', 'requisicao.uc_contexto_id_uc_contexto', '=', 'uc_contexto.id_uc_contexto')
        ->leftJoin('requisicao_has_equipamento', 'requisicao.id_requisicao', '=', 'requisicao_has_equipamento.requisicao_id_requisicao')
        ->leftJoin('equipamento', 'requisicao_has_equipamento.equipamento_id_equipamento', '=', 'equipamento.id_equipamento')
        ->leftJoin('modelo_equipamento', 'modelo_equipamento.id_modelo_equipamento', '=', 'equipamento.modelo_equipamento_id_modelo_equipamento')
        ->leftJoin('marca_equipamento', 'marca_equipamento.id_marca_equipamento', '=', 'modelo_equipamento.marca_equipamento_id_marca_equipamento')
        ->where('utilizador.id_utilizador', $id)
        ->select(
            'requisicao.id_requisicao',
            'requisicao.nome_requisicao',
            'requisicao.contexto_requisicao',
            'requisicao.comentario_professor_requisicao',
            'requisicao.comentario_sara_requisicao',
            'estado.nome_estado',
            'estado.id_estado',
            'requisicao_has_estado.data_estado',
            'requisicao_has_equipamento.data_inicio_requisicao',
            'requisicao_has_equipamento.data_fim_requisicao',
            'uc_contexto.nome_uc_contexto',
            'modelo_equipamento.nome_modelo_equipamento',
            'modelo_equipamento.imagem_modelo_equipamento',
            'marca_equipamento.nome_marca_equipamento',
            'equipamento.id_equipamento',
            'requisicao_has_utilizador.pin_recolha',
            'requisicao_has_utilizador.pin_devolucao'
            
        );

    $results = $query->get();

    $groupedResults = [];
    foreach ($results as $result) {
        $id_requisicao = $result->id_requisicao;
        if (!isset($groupedResults[$id_requisicao])) {
            // Copy the result as the base for this requisition
            $groupedResults[$id_requisicao] = $result->getAttributes();
            // Initialize an empty array for the equipment and states
            $groupedResults[$id_requisicao]['equipamento'] = [];
            $groupedResults[$id_requisicao]['estados'] = [];
        }

        // Add this equipment to the requisition's equipment array
        $equipamento = [
            'id_equipamento' => $result->id_equipamento,
            'nome_modelo_equipamento' => $result->nome_modelo_equipamento,
            'imagem_modelo_equipamento' => $result->imagem_modelo_equipamento,
            'nome_marca_equipamento' => $result->nome_marca_equipamento,
        ];

        if (!in_array($equipamento, $groupedResults[$id_requisicao]['equipamento'])) {
            $groupedResults[$id_requisicao]['equipamento'][] = $equipamento;
        }

        // Add this state to the requisition's states array
        $estado = [
            'nome_estado' => $result->nome_estado,
            'data_estado' => $result->data_estado,
            'id_estado' => $result->id_estado,
        ];

        if (!in_array($estado, $groupedResults[$id_requisicao]['estados'])) {
            $groupedResults[$id_requisicao]['estados'][] = $estado;
        }

        // Remove the equipment information from the base requisition array
        unset($groupedResults[$id_requisicao]['nome_modelo_equipamento']);
        unset($groupedResults[$id_requisicao]['imagem_modelo_equipamento']);
        unset($groupedResults[$id_requisicao]['nome_marca_equipamento']);
        unset($groupedResults[$id_requisicao]['id_equipamento']);
        // Remove the state information from the base requisition array
        unset($groupedResults[$id_requisicao]['nome_estado']);
        unset($groupedResults[$id_requisicao]['data_estado']);
        unset($groupedResults[$id_requisicao]['id_estado']);
    }

    return array_values($groupedResults);
    }
}