<?php

use App\Http\Controllers\EquipamentoController;
use Illuminate\Support\Facades\Route;




Route::get('/equipamentos', [EquipamentoController::class, 'index']);
