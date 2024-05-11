<?php

namespace App\Presenters;

use App\Models\Equipamento;

class EquipamentoPresenter
{
    public function getEquipamentos()
    {
        $query = Equipamento::leftJoin('equipamento_has_sub_categoria', 'equipamento.id_equipamento', '=', 'equipamento_has_sub_categoria.equipamento_id_equipamento')
            ->leftJoin('sub_categoria', 'equipamento_has_sub_categoria.sub_categoria_id_sub_categoria', '=', 'sub_categoria.id_sub_categoria')
            ->leftJoin('equipamento_has_categoria', 'equipamento.id_equipamento', '=', 'equipamento_has_categoria.equipamento_id_equipamento')
            ->leftJoin('categoria', 'equipamento_has_categoria.categoria_id_categoria', '=', 'categoria.id_categoria')
            ->leftJoin('modelo_equipamento', 'equipamento.modelo_equipamento_id_modelo_equipamento', '=', 'modelo_equipamento.id_modelo_equipamento')
            ->leftJoin('marca_equipamento', 'modelo_equipamento.marca_equipamento_id_marca_equipamento', '=', 'marca_equipamento.id_marca_equipamento')
            ->select(
                'equipamento.id_equipamento',
                'equipamento.id_interno_equipamento',
                'marca_equipamento.nome_marca_equipamento',
                'modelo_equipamento.nome_modelo_equipamento',
                'equipamento.numero_serie_equipamento',
                'equipamento.observacoes_equipamento',
                'modelo_equipamento.imagem_modelo_equipamento',
                'sub_categoria.nome_sub_categoria',
                'categoria.nome_categoria'
            );
        

        return $query->get();

    }
}