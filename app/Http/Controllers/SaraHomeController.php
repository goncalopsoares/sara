<?php

namespace App\Http\Controllers;

use App\Models\Requisicao;
use Illuminate\Http\Request;
use App\Models\RequisicaoHasEstado;
use App\Presenters\SaraHomePresenter;

class SaraHomeController extends Controller
{

    protected $saraPorValidarPresenter;
    protected $saraPorRecolherDevolverPresenter;
    protected $getEquipamento;
    protected $getRequisicaoDetalhe;

    public function __construct(SaraHomePresenter $getSaraPorValidar, SaraHomePresenter $getSaraPorRecolherDevolver, SaraHomePresenter $getEquipamento, SaraHomePresenter $getRequisicaoDetalhe)
    {
        $this->saraPorValidarPresenter = $getSaraPorValidar;
        $this->saraPorRecolherDevolverPresenter = $getSaraPorRecolherDevolver;
        $this->getEquipamento = $getEquipamento;
        $this->getRequisicaoDetalhe = $getRequisicaoDetalhe;    
    }


    /**
     * Display a listing of the resource.
     */
    public function saraValidar()
    {
        try {
            $response = $this->saraPorValidarPresenter->getSaraPorValidar();
            return response()->json($response);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao obter requisições' . $e->getMessage()], 500);
        }
    }

    public function saraRecolherDevolver($data)
    {
        try {
            $response = $this->saraPorRecolherDevolverPresenter->getSaraPorRecolherDevolver($data);
            return response()->json($response);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao obter requisições' . $e->getMessage()], 500);
        }
    }

    public function saraEquipamento($id)
    {
        try {
            $response = $this->saraPorRecolherDevolverPresenter->getEquipamento($id);
            return response()->json($response);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao obter requisições' . $e->getMessage()], 500);
        }
    }

    public function atualizarEstado(Request $request, $id)
    {
    
        try {
            $validate = $request->validate([
                'requisicao_id_requisicao' => 'required|integer',
                'estado_id_estado' => 'required|integer',
                'data_estado' => 'required|date_format:Y-m-d H:i:s',
            ]);

            // Criar a estado
            RequisicaoHasEstado::create([
                'requisicao_id_requisicao' => $id,
                'estado_id_estado' => $validate['estado_id_estado'],
                'data_estado' => $validate['data_estado'],
            ]);

            return response()->json(['message' => 'Estado atualizado com sucesso'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao atualizar estado' . $e->getMessage()], 500);
        }

    }

    public function comentarSara(Request $request, $id)
    {
        try {
            $validate = $request->validate([
                'comentario_sara_requisicao' => 'string|max:255',
            ]);

            Requisicao::where('id_requisicao', $id)->update([
                'comentario_sara_requisicao' => $validate['comentario_sara_requisicao'],
            ]);

            return response()->json(['message' => 'Comentário atualizado com sucesso'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao atualizar comentário' . $e->getMessage()], 500);
        }
    }

    public function getRequisicaoDetalhe($id)
    {
        try {
            $response = $this->getRequisicaoDetalhe->getRequisicaoDetalhe($id);
            return response()->json($response);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao obter requisições' . $e->getMessage()], 500);
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
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
