<?php

namespace App\Http\Controllers;

use App\Models\Requisicao;
use App\Models\RequisicaoHasEquipamento;
use Illuminate\Http\Request;
use App\Models\RequisicaoHasEstado;
use App\Models\RequisicaoHasUtilizador;
use App\Presenters\RequisicaoEquipamentoPresenter;

class RequisicaoController extends Controller
{

    /**
     * buscar os equipamentos segundo a UC
     */

    protected $requisicaoEquipamentoPresenter;

    public function __construct(RequisicaoEquipamentoPresenter $requisicaoEquipamentoPresenter)
    {
        $this->requisicaoEquipamentoPresenter = $requisicaoEquipamentoPresenter;
    }

    public function getEquipamentos($id_uc)
    {
        try {
            $response = $this->requisicaoEquipamentoPresenter->getRequisicaoEquipamentos($id_uc);
            return response()->json($response);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao obter requisições' . $e->getMessage()], 500);
        }
    }

    /**
     * buscar o resumo da requisicao
     */

    public function getResumoRequisicao($id_requisicao)
    {
        try {
            $resumoRequisicao = Requisicao::with(['utilizador' => function ($query) use ($id_requisicao) {
                $query->where('requisicao_has_utilizador.requisicao_id_requisicao', $id_requisicao)
                    ->withPivot('role_utilizador', 'pin_recolha', 'pin_devolucao');
            }])->find($id_requisicao);

            return response()->json($resumoRequisicao);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao obter resumo' . $e->getMessage()], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * inserir na base de dados informação básica da requisicao (nome, contexto, tipo, uc, utilizadores, pins)
     */
    public function storeInicial(Request $request)
    {

        try {
            $validate = $request->validate([
                'nome_requisicao' => 'required|string|max:45',
                'contexto_requisicao' => 'required|string|max:255',
                'tipo_requisicao' => 'required|in:Equipamento,Espaço',
                'uc_contexto_id_uc_contexto' => 'required|integer',
                'requisicao_has_utilizadores' => 'required|array',
                'requisicao_has_utilizadores.*.utilizador_id_utilizador' => 'required|integer',
                'requisicao_has_utilizadores.*.role_utilizador' => 'required|in:1,2,3,4',
                'requisicao_has_utilizadores.*.pin_recolha' => 'nullable|string|max:4',
                'requisicao_has_utilizadores.*.pin_devolucao' => 'nullable|string|max:4',
            ]);

            // Criar a requisição
            $requisicao = Requisicao::create([
                'nome_requisicao' => $validate['nome_requisicao'],
                'contexto_requisicao' => $validate['contexto_requisicao'],
                'tipo_requisicao' => $validate['tipo_requisicao'],
                'uc_contexto_id_uc_contexto' => $validate['uc_contexto_id_uc_contexto'],
            ]);

            // Obter o ID da requisição recém-criada
            $id_requisicao = $requisicao->id_requisicao;


            foreach ($validate['requisicao_has_utilizadores'] as $requisicao_utilizador) {
                RequisicaoHasUtilizador::create([
                    'requisicao_id_requisicao' => $id_requisicao,
                    'utilizador_id_utilizador' => $requisicao_utilizador['utilizador_id_utilizador'],
                    'role_utilizador' => $requisicao_utilizador['role_utilizador'],
                    'pin_recolha' => $requisicao_utilizador['pin_recolha'],
                    'pin_devolucao' => $requisicao_utilizador['pin_devolucao'],

                ]);
            }
            return response()->json(['message' => 'Requisição criada com sucesso'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao criar requisição' . $e->getMessage()], 500);
        }
    }


    /**
     * inserir na base de dados informção das datas de inicio e fim e equipamentos
     */
    public function storeFinal(Request $request, $id_requisicao)
    {

        try {
            $validate = $request->validate([
                'requisicao_id_requisicao' => 'required|integer',
                'estado_id_estado' => 'required|integer',
                'data_estado' => 'required|date_format:Y-m-d H:i:s',
                'requisicao_has_equipamentos' => 'required|array',
                'requisicao_has_equipamentos.*.requisicao_id_requisicao' => 'required|integer',
                'requisicao_has_equipamentos.*.equipamento_id_equipamento' => 'required|integer',
                'requisicao_has_equipamentos.*.data_inicio_requisicao' => 'required|date_format:Y-m-d H:i:s',
                'requisicao_has_equipamentos.*.data_fim_requisicao' => 'required|date_format:Y-m-d H:i:s',
            ]);

            // Criar a estado
            RequisicaoHasEstado::create([
                'requisicao_id_requisicao' => $id_requisicao,
                'estado_id_estado' => $validate['estado_id_estado'],
                'data_estado' => $validate['data_estado'],
            ]);

            foreach ($validate['requisicao_has_equipamentos'] as $requisicao_equipamento) {
                RequisicaoHasEquipamento::create([
                    'requisicao_id_requisicao' => $id_requisicao,
                    'equipamento_id_equipamento' => $requisicao_equipamento['equipamento_id_equipamento'],
                    'data_inicio_requisicao' => $requisicao_equipamento['data_inicio_requisicao'],
                    'data_fim_requisicao' => $requisicao_equipamento['data_fim_requisicao'],
                ]);
            }
            return response()->json(['message' => 'Requisição criada com sucesso'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao criar requisição' . $e->getMessage()], 500);
        }
    }




    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
