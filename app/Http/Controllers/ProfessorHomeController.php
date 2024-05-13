<?php

namespace App\Http\Controllers;

use App\Models\Requisicao;
use App\Models\UcContexto;
use Illuminate\Http\Request;
use App\Models\RequisicaoHasEstado;
use App\Presenters\ProfessorHomePresenter;

class ProfessorHomeController extends Controller
{
    protected $professorHomePresenter;

    public function __construct(ProfessorHomePresenter $professorHomePresenter)
    {
        $this->professorHomePresenter = $professorHomePresenter;
    }
    
    public function requisicoes($id)
    {
        return response()->json([
            'ProfessorHome' => $this->professorHomePresenter->getProfessorHome($id)
        ]);
    }

    public function validar($id)
    {
        return response()->json([
            'ProfessorValidate' => $this->professorHomePresenter->getProfessorValidate($id)
        ]);
    }


    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function requisicaoValidada(Request $request, $id)
    {
    
        try {
            $validate = $request->validate([
                'requisicao_id_requisicao' => 'required|integer',
                'estado_id_estado' => 'required|integer',
                'data_estado' => 'required|date_format:Y-m-d H:i:s',
                'comentario_professor_requisicao' => 'string|max:255',
            ]);

            // Criar a estado
            RequisicaoHasEstado::create([
                'requisicao_id_requisicao' => $id,
                'estado_id_estado' => $validate['estado_id_estado'],
                'data_estado' => $validate['data_estado'],
            ]);

            Requisicao::where('id_requisicao', $id)->update([
                'comentario_professor_requisicao' => $validate['comentario_professor_requisicao'],
            ]);

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
        $ucContexto = UcContexto::whereHas('utilizador', function($query) use ($id) {
            $query->where('utilizador_id_utilizador', $id);
        })->get();
    
        return response()->json($ucContexto);
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
