<?php

namespace App\Http\Controllers;

use App\Presenters\EquipamentoPresenter;

class EquipamentoController extends Controller
{
    protected $equipamentoPresenter;

    public function __construct(EquipamentoPresenter $equipamentoPresenter)
    {
        $this->equipamentoPresenter = $equipamentoPresenter;
    }

    public function index()
    {
        return response()->json([
            'equipamentos' => $this->equipamentoPresenter->getEquipamentos()
        ]);
    }
}

