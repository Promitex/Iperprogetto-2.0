<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PurPiemonte;
use App\Models\PurCampania; // <- corretto!

class MappingPurController extends Controller
{
    public function getcampania()
    {
        $data = PurCampania::select('regione','col0', 'col1', 'col2', 'col3', 'col4', 'col5')
            ->where('regione', 'campania')
            ->get();

        return response()->json($data);
    }

    public function getCol0()
    {
        $data = PurPiemonte::select('col0', 'col1', 'col2', 'col3', 'col4', 'col5')
            ->get();
        return response()->json($data);
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
