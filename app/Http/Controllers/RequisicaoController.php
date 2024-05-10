<?php

namespace App\Http\Controllers;

use App\Models\Requisicao;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\RequisicaoHasUtilizador;

class RequisicaoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
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
