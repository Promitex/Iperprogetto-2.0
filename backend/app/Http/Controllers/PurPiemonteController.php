<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PurPiemonte;

class PurPiemonteController extends Controller
{
    public function index()
    {
        $data = PurPiemonte::limit(10)->get();
        return response()->json($data);
    }
}
