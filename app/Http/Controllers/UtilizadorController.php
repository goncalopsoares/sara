<?php

namespace App\Http\Controllers;

use App\Models\Utilizador;
use App\Models\Categoria;
use App\Models\UcContexto;
use Illuminate\Http\Request;

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
        return Utilizador::find($id);
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
