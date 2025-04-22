<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PurPiemonte;

class MappingPurController extends Controller
{
    // Restituisce i valori unici della colonna col0
    public function getCol0()
    {
        $col0Values = PurPiemonte::select('col0')
            ->distinct()
            ->orderBy('col0')
            ->pluck('col0');

        return response()->json($col0Values);
    }

    // Restituisce i valori unici della colonna col1 filtrati per col0
    public function getCol1($col0)
    {
        $col1Values = PurPiemonte::where('col0', $col0)
            ->select('col1')
            ->distinct()
            ->orderBy('col1')
            ->pluck('col1');

        return response()->json($col1Values);
    }

    // Restituisce i dati filtrati per col0 e col1
    public function getCol2($col0, $col1)
    {
        $items = PurPiemonte::where('col0', $col0)
            ->where('col1', $col1)
            ->get();

        return response()->json($items);
    }
}
