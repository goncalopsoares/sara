<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RequisicaoController;
use App\Http\Controllers\UtilizadorController;
use App\Http\Controllers\EquipamentoController;
use App\Http\Controllers\EstudanteHomeController;

Route::get('/estudantehome/{id}', [EstudanteHomeController::class, 'requisicoes']); //pagina inicial -> informacoes das requisicoes -> nome, contexto, datas de inicio e fim, equipamentos, comentarios sara e professor, estado
Route::get('/estudantehome/uc/{id}', [EstudanteHomeController::class, 'show']); //pagina inicial -> ucs onde o estudante esta inscrito
Route::get('/utilizadores', [UtilizadorController::class, 'index']); //requisicao -> primeiro passo -> ucs e todos os utilizadores das mesmas
Route::post('/requisicao', [RequisicaoController::class, 'store']); //requisicao -> segundo passo -> criar requisicao


Route::get('/equipamentos', [EquipamentoController::class, 'index']);

