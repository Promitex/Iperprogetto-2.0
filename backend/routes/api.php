<?php
use Illuminate\Support\Facades\Route;
use App\Models\HfuMappingPur;

Route::get('/mapping-pur', function () {
    return response()->json(HfuMappingPur::limit(10)->get());
});
use App\Http\Controllers\PurPiemonteController;

Route::get('/piemonte', [PurPiemonteController::class, 'index']);

use App\Http\Controllers\MappingPurController;

Route::get('/piemonte/col0', [MappingPurController::class, 'getCol0']);
Route::get('/piemonte/col1/{col0}', [MappingPurController::class, 'getCol1']);
Route::get('/piemonte/col2/{col0}/{col1}', [MappingPurController::class, 'getCol2']);
Route::get('/test/getcampania', [MappingPurController::class, 'getcampania']);