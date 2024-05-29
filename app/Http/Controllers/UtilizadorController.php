<?php

namespace App\Http\Controllers;

use Log;
use App\Models\Categoria;
use App\Models\UcContexto;
use App\Models\Utilizador;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UtilizadorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $UcHasUtilizador = UcContexto::with('Utilizador')->get();
        
        return response()->json($UcHasUtilizador);
    }


    public function nomesUtilizadores()
    {

        try {
            // Buscar todos os utilizadores com os campos nome_utilizador e id_utilizador
            $utilizadores = DB::table('utilizador')->get();
    
            // Verifica se encontrou algum resultado
            if ($utilizadores->isEmpty()) {
                return response()->json(['message' => 'Nenhum utilizador encontrado.'], 404);
            } else {
                return response()->json($utilizadores, 200);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao buscar os utilizadores: ' . $e->getMessage()], 500);
        }


    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    
    {
        try {
        Categoria::create([
            'nome_categoria' => 'Teste',
        ]);

        Utilizador::create([
            'nome_utilizador' => 'Teste',
            'email_utilizador' => '@ua.pt',
            'numero_mecanografico_utilizador' => '123456',
            'tipo_utilizador' => '3',
        ]);

        if(Utilizador::where('nome_utilizador', 'Teste')->first()){
            return response()->json(['message' => 'Utilizador criado com sucesso'], 200);
        } else {
            return response()->json(['message' => 'Utilizador não criado'], 404);
        }

    } catch (\Exception $e) {
        return response()->json(['message' => 'Erro ao criar utilizador'], 404);
    }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            Categoria::create([
                'nome_categoria' => 'Teste',
            ]);
    
            Utilizador::create([
                'nome_utilizador' => 'Teste',
                'email_utilizador' => '@ua.pt',
                'numero_mecanografico_utilizador' => '123456',
                'tipo_utilizador' => '3',
            ]);
    
            if(Utilizador::where('nome_utilizador', 'Teste')->first()){
                return response()->json(['message' => 'Utilizador criado com sucesso'], 200);
            } else {
                return response()->json(['message' => 'Utilizador não criado'], 404);
            }
    
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao criar utilizador'], 404);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {


        $utilizador = Utilizador::find($id);
    
        if (!$utilizador) {
            return response()->json(['message' => 'Utilizador não encontrado'], 404);
        }
    
        return response()->json($utilizador);
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Utilizador $utilizador)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Utilizador $utilizador)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $utilizador = Utilizador::find($id);
    
        if($utilizador){
            $utilizador->delete();
            return response()->json(['message' => 'Utilizador apagado com sucesso'], 200);
        } else {
            return response()->json(['message' => 'Utilizador não encontrado'], 404);
        }
    }
}
