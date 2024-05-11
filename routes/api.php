<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RequisicaoController;
use App\Http\Controllers\UtilizadorController;
use App\Http\Controllers\EquipamentoController;
use App\Http\Controllers\EstudanteHomeController;

//Rotas para estudantes

Route::get('/estudantehome/{id}', [EstudanteHomeController::class, 'requisicoes']); //pagina inicial -> informacoes das requisicoes -> nome, contexto, datas de inicio e fim, equipamentos, comentarios sara e professor, estado
Route::get('/estudantehome/uc/{id}', [EstudanteHomeController::class, 'show']); //pagina inicial -> ucs onde o estudante esta inscrito
Route::get('/utilizadores', [UtilizadorController::class, 'index']); //requisicao -> primeiro passo -> ucs e todos os utilizadores das mesmas
Route::post('/requisicao', [RequisicaoController::class, 'storeInicial']); //requisicao -> segundo passo -> criar requisicao - guardar o id na requisicao e passar por props
Route::get('/requisicao/uc/{id_uc}', [RequisicaoController::class, 'getEquipamentos']); //requisicao -> terceiro passo -> equipamentos para requisicao segundo UC
Route::get('requisicao/resumo/{id_requisicao}', [RequisicaoController::class, 'getResumoRequisicao']); //requisicao -> quarto passo -> resumo da requisicao (nome, contexto, uc, utilizadores) conjugar com o array de informação anterior no frontend
Route::post('/requisicao/{id_requisicao}', [RequisicaoController::class, 'storeFinal']); //requisicao -> quinto passo -> guardar a requisicao na base de dados com equipamentos e datas de inicio e fim, e alteracao de estado


//
Route::get('/equipamentos', [EquipamentoController::class, 'index']); 

