<?php

namespace App\Http\Controllers;

use App\Models\UcContexto;
use Illuminate\Http\Request;
use App\Presenters\EstudanteHomePresenter;

class EstudanteHomeController extends Controller
{
    protected $estudanteHomePresenter;

    public function __construct(EstudanteHomePresenter $estudanteHomePresenter)
    {
        $this->estudanteHomePresenter = $estudanteHomePresenter;
    }

    /**
     * Display a listing of the resource.
     */
    public function requisicoes($id)
    {
        return response()->json([
            'EstudanteHome' => $this->estudanteHomePresenter->getEstudanteHome($id)
        ]);
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
