<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UtilizadorController;
use App\Http\Controllers\EquipamentoController;
use App\Http\Controllers\EstudanteHomeController;




Route::get('/equipamentos', [EquipamentoController::class, 'index']);
Route::get('/estudantehome/{id}', [EstudanteHomeController::class, 'requisicoes']);
Route::get('/estudantehome/uc/{id}', [EstudanteHomeController::class, 'show']);
Route::apiResource('utilizadores', UtilizadorController::class);
