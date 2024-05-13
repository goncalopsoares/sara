<?php

namespace App\Presenters;

use App\Models\Requisicao;

class SaraHomePresenter
{
    public function getSaraPorValidar()
    {
        $query = Requisicao::leftJoin('requisicao_has_utilizador', 'requisicao.id_requisicao', '=', 'requisicao_has_utilizador.requisicao_id_requisicao')
            ->leftJoin('utilizador', 'requisicao_has_utilizador.utilizador_id_utilizador', '=', 'utilizador.id_utilizador')
            ->leftJoin('requisicao_has_estado', 'requisicao.id_requisicao', '=', 'requisicao_has_estado.requisicao_id_requisicao')
            ->leftJoin('estado', 'requisicao_has_estado.estado_id_estado', '=', 'estado.id_estado')
            ->where(function ($query) {
                $query->whereBetween('requisicao_has_estado.data_estado', ['2024-05-13 00:00:00', '2024-05-13 23:59:00'])
                    ->whereIn('requisicao_has_estado.estado_id_estado', [3, 4, 5]);
            })
            ->orWhere(function ($query) {
                $query->whereBetween('requisicao_has_estado.data_estado', ['2024-05-13 00:00:00', '2024-05-13 23:59:00'])
                    ->whereIn('requisicao_has_estado.estado_id_estado', [3, 4, 5]);
            })
            ->select(
                'requisicao.id_requisicao',
                'requisicao.nome_requisicao',
                'requisicao.avaliacao_requisicao',
                'estado.nome_estado',
                'requisicao_has_estado.data_estado',
                'requisicao_has_utilizador.role_utilizador',
                'requisicao_has_utilizador.pin_recolha',
                'requisicao_has_utilizador.pin_devolucao',
                'utilizador.nome_utilizador',
                'utilizador.numero_mecanografico_utilizador',
                'utilizador.email_utilizador',
                'utilizador.avatar_utilizador',
                'utilizador.tipo_utilizador'
            );

        $results = $query->get();


        $groupedResults = [];
        foreach ($results as $result) {
            $id_requisicao = $result->id_requisicao;
            if (!isset($groupedResults[$id_requisicao])) {
                // Copy the result as the base for this requisition
                $groupedResults[$id_requisicao] = $result->getAttributes();
                // Initialize an empty array for the equipment
                $groupedResults[$id_requisicao]['utilizador'] = [];
            }

            $utilizador = [
                'nome_utilizador' => $result->nome_utilizador,
                'numero_mecanografico_utilizador' => $result->numero_mecanografico_utilizador,
                'email_utilizador' => $result->email_utilizador,
                'avatar_utilizador' => $result->avatar_utilizador,
                'tipo_utilizador' => $result->tipo_utilizador,
            ];

            // Check if this equipment is already in the 'equipamento' array
            if (!in_array($utilizador, $groupedResults[$id_requisicao]['utilizador'])) {
                // If not, add it to the 'equipamento' array
                $groupedResults[$id_requisicao]['utilizador'][] = $utilizador;
            }
            // Remove the equipment information from the base requisition array
            unset($groupedResults[$id_requisicao]['nome_utilizador']);
            unset($groupedResults[$id_requisicao]['tipo_utilizador']);
            unset($groupedResults[$id_requisicao]['numero_mecanografico_utilizador']);
            unset($groupedResults[$id_requisicao]['email_utilizador']);
            unset($groupedResults[$id_requisicao]['avatar_utilizador']);
        }

        return array_values($groupedResults);
    }


    public function getSaraPorRecolherDevolver()
    {
        $query = Requisicao::leftJoin('requisicao_has_utilizador', 'requisicao.id_requisicao', '=', 'requisicao_has_utilizador.requisicao_id_requisicao')
            ->leftJoin('utilizador', 'requisicao_has_utilizador.utilizador_id_utilizador', '=', 'utilizador.id_utilizador')
            ->leftJoin('requisicao_has_estado', 'requisicao.id_requisicao', '=', 'requisicao_has_estado.requisicao_id_requisicao')
            ->leftJoin('estado', 'requisicao_has_estado.estado_id_estado', '=', 'estado.id_estado')
            ->where(function ($query) {
                $query->whereBetween('requisicao_has_estado.data_estado', ['2024-05-13 00:00:00', '2024-05-13 23:59:00'])
                    ->whereIn('requisicao_has_estado.estado_id_estado', [5, 6, 7]);
            })
            ->orWhere(function ($query) {
                $query->whereBetween('requisicao_has_estado.data_estado', ['2024-05-13 00:00:00', '2024-05-13 23:59:00'])
                    ->whereIn('requisicao_has_estado.estado_id_estado', [5, 6, 7]);
            })
            ->select(
                'requisicao.id_requisicao',
                'requisicao.nome_requisicao',
                'requisicao.avaliacao_requisicao',
                'estado.nome_estado',
                'requisicao_has_estado.data_estado',
                'requisicao_has_utilizador.role_utilizador',
                'requisicao_has_utilizador.pin_recolha',
                'requisicao_has_utilizador.pin_devolucao',
                'utilizador.nome_utilizador',
                'utilizador.numero_mecanografico_utilizador',
                'utilizador.email_utilizador',
                'utilizador.avatar_utilizador',
                'utilizador.tipo_utilizador'
            );

        $results = $query->get();


        $groupedResults = [];
        foreach ($results as $result) {
            $id_requisicao = $result->id_requisicao;
            if (!isset($groupedResults[$id_requisicao])) {
                // Copy the result as the base for this requisition
                $groupedResults[$id_requisicao] = $result->getAttributes();
                // Initialize an empty array for the equipment
                $groupedResults[$id_requisicao]['utilizador'] = [];
            }

            $utilizador = [
                'nome_utilizador' => $result->nome_utilizador,
                'numero_mecanografico_utilizador' => $result->numero_mecanografico_utilizador,
                'email_utilizador' => $result->email_utilizador,
                'avatar_utilizador' => $result->avatar_utilizador,
                'tipo_utilizador' => $result->tipo_utilizador,
            ];

            // Check if this equipment is already in the 'equipamento' array
            if (!in_array($utilizador, $groupedResults[$id_requisicao]['utilizador'])) {
                // If not, add it to the 'equipamento' array
                $groupedResults[$id_requisicao]['utilizador'][] = $utilizador;
            }
            // Remove the equipment information from the base requisition array
            unset($groupedResults[$id_requisicao]['nome_utilizador']);
            unset($groupedResults[$id_requisicao]['tipo_utilizador']);
            unset($groupedResults[$id_requisicao]['numero_mecanografico_utilizador']);
            unset($groupedResults[$id_requisicao]['email_utilizador']);
            unset($groupedResults[$id_requisicao]['avatar_utilizador']);
        }

        return array_values($groupedResults);
    }


    public function getEquipamento($id)
    {
        $query = Requisicao::join('requisicao_has_utilizador', 'requisicao_has_utilizador.requisicao_id_requisicao', '=', 'requisicao.id_requisicao')
            ->join('utilizador', 'utilizador.id_utilizador', '=', 'requisicao_has_utilizador.utilizador_id_utilizador')
            ->rightJoin('requisicao_has_estado', 'requisicao_has_estado.requisicao_id_requisicao', '=', 'requisicao.id_requisicao')
            ->rightJoin('estado', 'requisicao_has_estado.estado_id_estado', '=', 'estado.id_estado')
            ->rightJoin('uc_contexto', 'requisicao.uc_contexto_id_uc_contexto', '=', 'uc_contexto.id_uc_contexto')
            ->rightJoin('requisicao_has_equipamento', 'requisicao.id_requisicao', '=', 'requisicao_has_equipamento.requisicao_id_requisicao')
            ->join('equipamento', 'requisicao_has_equipamento.equipamento_id_equipamento', '=', 'equipamento.id_equipamento')
            ->join('modelo_equipamento', 'modelo_equipamento.id_modelo_equipamento', '=', 'equipamento.modelo_equipamento_id_modelo_equipamento')
            ->join('marca_equipamento', 'marca_equipamento.id_marca_equipamento', '=', 'modelo_equipamento.marca_equipamento_id_marca_equipamento')
            ->where('requisicao.id_requisicao', $id)
            ->select(
                'requisicao.id_requisicao',
                'requisicao.contexto_requisicao',
                'requisicao_has_equipamento.data_inicio_requisicao',
                'requisicao_has_equipamento.data_fim_requisicao',
                'requisicao_has_utilizador.role_utilizador',
                'requisicao_has_utilizador.pin_recolha',
                'requisicao_has_utilizador.pin_devolucao',
                'utilizador.nome_utilizador',
                'utilizador.email_utilizador',
                'utilizador.numero_mecanografico_utilizador',
                'utilizador.avatar_utilizador',
                'utilizador.tipo_utilizador',
                'uc_contexto.nome_uc_contexto',
                'modelo_equipamento.nome_modelo_equipamento',
                'modelo_equipamento.imagem_modelo_equipamento',
                'marca_equipamento.nome_marca_equipamento',
                'equipamento.id_equipamento',
                'equipamento.id_interno_equipamento',
                'equipamento.numero_serie_equipamento',
                'equipamento.numero_inventario_equipamento',
                'equipamento.observacoes_equipamento',
            );

        $results = $query->get();

        $groupedResults = [];
        foreach ($results as $result) {
            $id_requisicao = $result->id_requisicao;
            if (!isset($groupedResults[$id_requisicao])) {
                // Copy the result as the base for this requisition
                $groupedResults[$id_requisicao] = $result->getAttributes();
                // Initialize an empty array for the equipment
                $groupedResults[$id_requisicao]['equipamento'] = [];
                $groupedResults[$id_requisicao]['utilizador'] = [];
            }

            $equipamento = [
                'nome_modelo_equipamento' => $result->nome_modelo_equipamento,
                'imagem_modelo_equipamento' => $result->imagem_modelo_equipamento,
                'nome_marca_equipamento' => $result->nome_marca_equipamento,
                'id_interno_equipamento' => $result->id_interno_equipamento,
                'numero_serie_equipamento' => $result->numero_serie_equipamento,
                'numero_inventario_equipamento' => $result->numero_invetario_equipamento,
                'observacoes_equipamento' => $result->observacoes_equipamento,
            ];

            // Check if this equipment is already in the 'equipamento' array
            if (!in_array($equipamento, $groupedResults[$id_requisicao]['equipamento'])) {
                // If not, add it to the 'equipamento' array
                $groupedResults[$id_requisicao]['equipamento'][] = $equipamento;
            }

            $utilizador = [
                'nome_utilizador' => $result->nome_utilizador,
                'role_utilizador' => $result->role_utilizador,
                'email_utilizador' => $result->email_utilizador,
                'numero_mecanografico_utilizador' => $result->numero_mecanografico_utilizador,
                'avatar_utilizador' => $result->avatar_utilizador,
                'tipo_utilizador' => $result->tipo_utilizador,
                'pin_recolha' => $result->pin_recolha,
                'pin_devolucao' => $result->pin_devolucao,
            ];

            // Check if this equipment is already in the 'equipamento' array
            if (!in_array($utilizador, $groupedResults[$id_requisicao]['utilizador'])) {
                // If not, add it to the 'equipamento' array
                $groupedResults[$id_requisicao]['utilizador'][] = $utilizador;
            }

            // Remove the equipment information from the base requisition array
            unset($groupedResults[$id_requisicao]['nome_modelo_equipamento']);
            unset($groupedResults[$id_requisicao]['imagem_modelo_equipamento']);
            unset($groupedResults[$id_requisicao]['nome_marca_equipamento']);
            unset($groupedResults[$id_requisicao]['id_equipamento']);
            unset($groupedResults[$id_requisicao]['id_interno_equipamento']);
            unset($groupedResults[$id_requisicao]['numero_serie_equipamento']);
            unset($groupedResults[$id_requisicao]['numero_inventario_equipamento']);
            unset($groupedResults[$id_requisicao]['observacoes_equipamento']);
            unset($groupedResults[$id_requisicao]['nome_utilizador']);
            unset($groupedResults[$id_requisicao]['role_utilizador']);
            unset($groupedResults[$id_requisicao]['pin_recolha']);
            unset($groupedResults[$id_requisicao]['pin_devolucao']);
            unset($groupedResults[$id_requisicao]['email_utilizador']);
            unset($groupedResults[$id_requisicao]['numero_mecanografico_utilizador']);
            unset($groupedResults[$id_requisicao]['avatar_utilizador']);
            unset($groupedResults[$id_requisicao]['tipo_utilizador']);
        }

        return array_values($groupedResults);
    }
}
