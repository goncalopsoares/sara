<?php

namespace App\Presenters;

use App\Models\Equipamento;

class RequisicaoEquipamentoPresenter
{
    public function getRequisicaoEquipamentos($id_uc)
    {
        $query = Equipamento::leftJoin('equipamento_has_uc', 'equipamento.id_equipamento', '=', 'equipamento_has_uc.equipamento_id_equipamento')
            ->leftJoin('requisicao_has_equipamento', 'equipamento.id_equipamento', '=', 'requisicao_has_equipamento.equipamento_id_equipamento')
            ->leftJoin('equipamento_has_sub_categoria', 'equipamento.id_equipamento', '=', 'equipamento_has_sub_categoria.equipamento_id_equipamento')
            ->leftJoin('sub_categoria', 'equipamento_has_sub_categoria.sub_categoria_id_sub_categoria', '=', 'sub_categoria.id_sub_categoria')
            ->leftJoin('equipamento_has_categoria', 'equipamento.id_equipamento', '=', 'equipamento_has_categoria.equipamento_id_equipamento')
            ->leftJoin('categoria', 'equipamento_has_categoria.categoria_id_categoria', '=', 'categoria.id_categoria')
            ->leftJoin('modelo_equipamento', 'equipamento.modelo_equipamento_id_modelo_equipamento', '=', 'modelo_equipamento.id_modelo_equipamento')
            ->leftJoin('marca_equipamento', 'modelo_equipamento.marca_equipamento_id_marca_equipamento', '=', 'marca_equipamento.id_marca_equipamento')
            ->leftJoin('modelo_equipamento_has_modelo_equipamento', 'modelo_equipamento.id_modelo_equipamento', '=', 'modelo_equipamento_has_modelo_equipamento.camaras')
            ->where('equipamento_has_uc.uc_id_uc', $id_uc)
            ->select(
                'modelo_equipamento.id_modelo_equipamento',
                'marca_equipamento.nome_marca_equipamento',
                'modelo_equipamento.nome_modelo_equipamento',
                'modelo_equipamento.descricao_modelo_equipamento',
                'modelo_equipamento.imagem_modelo_equipamento',
                'modelo_equipamento.especificacoes_modelo_equipamento',
                'modelo_equipamento.aplicablidade_modelo_equipamento',
                'modelo_equipamento.cuidados_modelo_equipamento',
                'modelo_equipamento_has_modelo_equipamento.camaras',
                'modelo_equipamento_has_modelo_equipamento.objetivas',
                'equipamento.id_equipamento',
                'equipamento.observacoes_equipamento',
                'sub_categoria.nome_sub_categoria',
                'categoria.nome_categoria',
                'requisicao_has_equipamento.requisicao_id_requisicao',
                'requisicao_has_equipamento.comentarios',
                'requisicao_has_equipamento.data_inicio_requisicao',
                'requisicao_has_equipamento.data_fim_requisicao'
            );

        $results = $query->get();

        $groupedResults = [];
        foreach ($results as $result) {
            $id_modelo = $result->id_modelo_equipamento;
            $id_equipamento = $result->id_equipamento;

            // Group by id_modelo_equipamento
            if (!isset($groupedResults[$id_modelo])) {
                $groupedResults[$id_modelo] = $result->only([
                    'id_modelo_equipamento',
                    'nome_marca_equipamento',
                    'nome_modelo_equipamento',
                    'descricao_modelo_equipamento',
                    'imagem_modelo_equipamento',
                    'especificacoes_modelo_equipamento',
                    'aplicablidade_modelo_equipamento',
                    'cuidados_modelo_equipamento',
                    'camaras',
                    'objetivas'
                ]);
                $groupedResults[$id_modelo]['equipamentos'] = [];
            }

            // Group by id_equipamento within each id_modelo_equipamento
            if (!isset($groupedResults[$id_modelo]['equipamentos'][$id_equipamento])) {
                $groupedResults[$id_modelo]['equipamentos'][$id_equipamento] = $result->only([
                    'id_equipamento',
                    'observacoes_equipamento',
                    'nome_sub_categoria',
                    'nome_categoria'
                ]);
                $groupedResults[$id_modelo]['equipamentos'][$id_equipamento]['requisicoes'] = [];
            }

            // Add requisition details under each equipamento
            $requisicao = $result->only([
                'requisicao_id_requisicao',
                'comentarios',
                'data_inicio_requisicao',
                'data_fim_requisicao'
            ]);

            // Check if the requisition already exists to avoid duplicates
            if (!in_array($requisicao, $groupedResults[$id_modelo]['equipamentos'][$id_equipamento]['requisicoes'])) {
                $groupedResults[$id_modelo]['equipamentos'][$id_equipamento]['requisicoes'][] = $requisicao;
            }
        }

        // Convert the nested arrays into the desired structure
        foreach ($groupedResults as &$groupedResult) {
            $groupedResult['equipamentos'] = array_values($groupedResult['equipamentos']);
        }

        return array_values($groupedResults);
    }
}