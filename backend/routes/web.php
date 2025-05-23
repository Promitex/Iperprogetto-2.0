<?php
use App\Models\HfuMappingPur;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MappingPurController;

Route::get('/api/test', [MappingPurController::class, 'getCol0']);
// use App\Http\Controllers\PurPiemonteController;

// Route::get('/piemonte', [PurPiemonteController::class, 'index']);


Route::get('/api/test/col0', [MappingPurController::class, 'getCol0']);
Route::get('/api/test/col1/{col0}', [MappingPurController::class, 'getCol1']);
Route::get('/api/test/col2/{col0}/{col1}', [MappingPurController::class, 'getCol2']);
