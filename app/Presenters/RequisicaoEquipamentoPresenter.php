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
                'equipamento_has_uc.uc_id_uc',
                'modelo_equipamento.id_modelo_equipamento',
                'marca_equipamento.nome_marca_equipamento',
                'modelo_equipamento.nome_modelo_equipamento',
                'equipamento.observacoes_equipamento',
                'sub_categoria.nome_sub_categoria',
                'categoria.nome_categoria',
                'modelo_equipamento.descricao_modelo_equipamento',
                'modelo_equipamento.imagem_modelo_equipamento',
                'modelo_equipamento.especificacoes_modelo_equipamento',
                'modelo_equipamento.aplicablidade_modelo_equipamento',
                'modelo_equipamento.cuidados_modelo_equipamento',
                'modelo_equipamento_has_modelo_equipamento.camaras',
                'modelo_equipamento_has_modelo_equipamento.objetivas',
                'requisicao_has_equipamento.requisicao_id_requisicao',
                'requisicao_has_equipamento.comentarios',
                'requisicao_has_equipamento.data_inicio_requisicao',
                'requisicao_has_equipamento.data_fim_requisicao'
            );


        return $query->get();
    }
}