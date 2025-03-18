<?php

namespace App\Http\Controllers;

use App\Models\Pago;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PagoController extends Controller
{
    public function index(Request $request)
    {
        $pagos = Pago::all();
    
        if ($request->wantsJson()) {
            return response()->json(['pagos' => $pagos]);
        }
    
        return Inertia::render('dashboard', [
            'pagos' => $pagos
        ]);
    }
    

    public function store(Request $request)
{
    $request->validate([
        'nombre' => 'required|string',
        'tipo' => 'required|in:mensual,anual',
        'monto' => 'required|numeric',
        'fecha' => 'required|date'
    ]);

    $pago = Pago::create($request->all());

    if ($request->wantsJson()) {
        return response()->json(['mensaje' => 'Pago registrado', 'pago' => $pago]);
    }

    return redirect()->route('dashboard');
}

}

