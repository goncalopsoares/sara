<?php

namespace App\Http\Controllers;

use App\Models\Requisicao;
use App\Models\Utilizador;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\RequisicaoHasEstado;
use App\Models\RequisicaoHasUtilizador;
use App\Models\RequisicaoHasEquipamento;
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
    public function ultimaRequisicao($id)
    {
        try {
            // Busca a última requisição para o utilizador com o role_utilizador = 3
            $ultimaRequisicao = RequisicaoHasUtilizador::where('utilizador_id_utilizador', $id)
                                ->where('role_utilizador', 3)
                                ->orderBy('requisicao_id_requisicao', 'desc')
                                ->first();

            // Verifica se encontrou algum resultado
            if ($ultimaRequisicao) {
                return response()->json($ultimaRequisicao, 200);
            } else {
                return response()->json(['message' => 'Nenhuma requisição encontrada para este utilizador.'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao buscar a última requisição: ' . $e->getMessage()], 500);
        }
    }

    public function ultimaRequisicaoSemEstado($id)
    {
        try {
            // Busca a última requisição para o utilizador com o role_utilizador = 3
            $ultimaRequisicao = RequisicaoHasUtilizador::where('utilizador_id_utilizador', $id)
                                    ->where('role_utilizador', 3)
                                    ->orderBy('requisicao_id_requisicao', 'desc')
                                    ->first();
            
            // Verifica se encontrou algum resultado
            if ($ultimaRequisicao) {
                // ID da última requisição encontrada
                $ultimaRequisicaoId = $ultimaRequisicao->requisicao_id_requisicao;
        
                // Busca a requisição completa para obter a coluna uc_contexto_id_uc_contexto
                $requisicao = DB::table('requisicao')
                                ->where('id_requisicao', $ultimaRequisicaoId)
                                ->first();
        
                // Verifica se a última requisição está na tabela requisicao_has_estado
                $requisicaoComEstado = DB::table('requisicao_has_estado')
                                        ->where('requisicao_id_requisicao', $ultimaRequisicaoId)
                                        ->exists();
        
                // Busca dados da tabela requisicao_has_utilizador relacionados à última requisição
                $utilizadores = DB::table('requisicao_has_utilizador')
                                    ->where('requisicao_id_requisicao', $ultimaRequisicaoId)
                                    ->get(['utilizador_id_utilizador', 'role_utilizador']);
        
                if ($requisicaoComEstado) {
                    return response()->json([
                        'message' => 'A última requisição encontrada já possui um estado associado.',
                    ], 200);
                } else {
                    return response()->json([
                        'message' => 'A última requisição encontrada não possui um estado associado.',
                        'uc_contexto_id_uc_contexto' => $requisicao->uc_contexto_id_uc_contexto,
                        'id_requisicao' => $requisicao->id_requisicao,
                        'nome_requisicao' => $requisicao->nome_requisicao,
                        'contexto_requisicao' => $requisicao->contexto_requisicao,
                        'utilizadores' => $utilizadores,
                    ], 200);
                }
            } else {
                return response()->json(['message' => 'Nenhuma requisição encontrada para este utilizador.'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao buscar a última requisição: ' . $e->getMessage()], 500);
        }
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


    public function avaliarRequisicao(Request $request, $id) {
        try {
            $validate = $request->validate([
                'comentario_aluno_requisicao' => 'string|max:1000',
                'avaliacao_requisicao' => 'required|integer|in:1,2,3,4,5',
            ]);

            Requisicao::where('id_requisicao', $id)->update([
                'comentario_aluno_requisicao' => $validate['comentario_aluno_requisicao'],
                'avaliacao_requisicao' => $validate['avaliacao_requisicao'],
            ]);

            return response()->json(['message' => 'Requisição avaliada com sucesso'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao avaliar requisição' . $e->getMessage()], 500);
        }
    }



   
    public function getPin($id_requisicao)
{
    // Buscar a requisição pelo ID
    $requisicao = Requisicao::findOrFail($id_requisicao);

    // Verificar o último estado da requisição
    $ultimoEstado = $requisicao->estado()
        ->orderBy('requisicao_has_estado.data_estado', 'desc')
        ->first();

    if ($ultimoEstado) {
        // Verifica se o estado é 3 ou 4
        if ($ultimoEstado->id_estado == 3) {
            return $requisicao->utilizador->first()->pivot->pin_recolha;
        } elseif ($ultimoEstado->id_estado == 4) {
            return $requisicao->utilizador->first()->pivot->pin_devolucao;
        }
    }

    // Caso não encontre um estado 4 ou 5, retorna null ou um valor padrão
    return null;
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
        $requisicao = Requisicao::find($id);

        if ($requisicao) {
       
            //eliminar linhas dependentes
            RequisicaoHasUtilizador::where('requisicao_id_requisicao', $id)->delete();

            
            $requisicao->delete();

            return response()->json(['message' => 'Requisição eliminada com sucesso.'], 200);
        } else {
            return response()->json(['message' => 'Requisição não encontrada.'], 404);
        }
    }
}
