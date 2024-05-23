<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SaraHomeController;
use App\Http\Controllers\RequisicaoController;
use App\Http\Controllers\UtilizadorController;
use App\Http\Controllers\EquipamentoController;
use App\Http\Controllers\EstudanteHomeController;
use App\Http\Controllers\ProfessorHomeController;


//Rotas para estudantes

Route::get('/estudantehome/{id}', [EstudanteHomeController::class, 'requisicoes']); //pagina inicial -> informacoes das requisicoes -> nome, contexto, datas de inicio e fim, equipamentos, comentarios sara e professor, estado
Route::get('/estudantehome/uc/{id}', [EstudanteHomeController::class, 'show']); //pagina inicial -> ucs onde o estudante esta inscrito
Route::get('/utilizadores', [UtilizadorController::class, 'index']); //requisicao -> primeiro passo -> ucs e todos os utilizadores das mesmas
Route::post('/requisicao', [RequisicaoController::class, 'storeInicial']); //requisicao -> segundo passo -> criar requisicao - guardar o id na requisicao e passar por props
Route::get('/requisicao/uc/{id_uc}', [RequisicaoController::class, 'getEquipamentos']); //requisicao -> terceiro passo -> equipamentos para requisicao segundo UC
Route::get('requisicao/resumo/{id_requisicao}', [RequisicaoController::class, 'getResumoRequisicao']); //requisicao -> quarto passo -> resumo da requisicao (nome, contexto, uc, utilizadores) conjugar com o array de informação anterior no frontend
Route::post('/requisicao/{id_requisicao}', [RequisicaoController::class, 'storeFinal']); //requisicao -> quinto passo -> guardar a requisicao na base de dados com equipamentos e datas de inicio e fim, e alteracao de estado

Route::get('/requisicao/ultimarequisicao/{id}', [RequisicaoController::class,'ultimaRequisicao']); //ver a ultima requisicao criada

Route::post('requisicao/avaliar/{id}', [RequisicaoController::class, 'avaliarRequisicao']); //avaliar requisicao e comentario


// Rotas para professores

Route::get('/professorhome/{id}', [ProfessorHomeController::class, 'requisicoes']);//pagina inicial -> informacoes das requisicoes -> nome, contexto, datas de inicio e fim, equipamentos, comentarios sara e estado, onde o professor é o requisitante
Route::get('/professorhome/uc/{id}', [ProfessorHomeController::class, 'show']); //pagina inicial -> ucs onde o professor esta inscrito 
//esta também dá para ir buscar as UC's antes de iniciar nova requisicao
Route::get('/professorhome/porvalidar/{id}', [ProfessorHomeController::class, 'validar']); //pagina inicial -> informacoes das requisicoes -> nome, contexto, datas de inicio e fim, equipamentos, comentarios sara e estado, onde o professor está. ->necessário ver também a data do ultimo estado para perceber se ele já foi ou não validado.
Route::post('/requisicao/validar/{id}', [ProfessorHomeController::class, 'requisicaoValidada']); //validar requisicao -> alterar estado da requisicao para estado de aceite ou rejeitada. Coloca também um update no comentário do professor
Route::post('/requisicao', [RequisicaoController::class, 'storeInicial']); //requisicao -> segundo passo -> criar requisicao - guardar o id na requisicao e passar por props
Route::get('/requisicao/uc/{id_uc}', [RequisicaoController::class, 'getEquipamentos']); //requisicao -> terceiro passo -> equipamentos para requisicao segundo UC
Route::get('requisicao/resumo/{id_requisicao}', [RequisicaoController::class, 'getResumoRequisicao']); //requisicao -> quarto passo -> resumo da requisicao (nome, contexto, uc, utilizadores) conjugar com o array de informação anterior no frontend
Route::post('/requisicao/{id_requisicao}', [RequisicaoController::class, 'storeFinal']); //requisicao -> quinto passo -> guardar a requisicao na base de dados com equipamentos e datas de inicio e fim, e alteracao de estado
Route::post('requisicao/avaliar/{id}', [RequisicaoController::class, 'avaliarRequisicao']); //avaliar requisicao e comentario


//Rotas para os SARA
Route::get('/sara/validar', [SaraHomeController::class, 'saraValidar']); //pagina inicial -> informacoes das requisicao por validar, com utilizadores
Route::get('/sara/recolher', [SaraHomeController::class, 'saraRecolherDevolver']); //pagina inicial -> informacoes das requisicao por recolher e devolver, com utilizadores
Route::get('/sara/detalherequisicao/{id}', [SaraHomeController::class, 'saraEquipamento']); //pagina inicial -> informacoes das requisicoes -> nome, contexto, datas de inicio e fim, equipamentos, comentarios sara e estado, onde o professor está. ->necessário ver também a data do ultimo estado para perceber se ele já foi ou não validado.
Route::post('/sara/atualizarestado/{id}', [SaraHomeController::class, 'atualizarEstado']); //atualizar estado da requisicao -> comentario so deve ser elaborado se a requisicao mudar para o estado 4 ou 5 (confirmar ou rejeitar)


//
Route::get('/equipamentos', [EquipamentoController::class, 'index']); 


//dados utilizador
/* Route::middleware('auth:sanctum')->get('/user', function(Request $request){
    return $request->user();
}); */




//registo
Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:10,1');
Route::post('/register', [AuthController::class, 'register']);

//logout
//Route::get('/logout', [AuthController::class, 'logout']);

Route::get('/utilizador/{id}', [UtilizadorController::class, 'show']);
Route::post('/logout', [AuthController::class, 'logout']);