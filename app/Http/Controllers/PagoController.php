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
            'fecha' => 'required|date',
            'icono' => 'nullable|string'
        ]);

        $pago = Pago::create($request->all());

        if ($request->wantsJson()) {
            return response()->json(['mensaje' => 'Pago registrado', 'pago' => $pago]);
        }

        return redirect()->route('dashboard');
    }

    public function update(Request $request, Pago $pago)
    {
        $request->validate([
            'nombre' => 'required|string',
            'tipo' => 'required|in:mensual,anual,bimestral',
            'monto' => 'required|numeric',
            'fecha' => 'required|date',
            'icono' => 'nullable|string'
        ]);

        $pago->update($request->all());

        if ($request->wantsJson()) {
            return response()->json(['mensaje' => 'Pago actualizado', 'pago' => $pago]);
        }

        return redirect()->route('dashboard');
    }

    public function destroy(Pago $pago)
    {
        $pago->delete();

        if (request()->wantsJson()) {
            return response()->json(['mensaje' => 'Pago eliminado']);
        }

        return redirect()->route('dashboard');
    }

    public function marcarComoPagado(Pago $pago)
{
    $fechaActual = new \DateTime($pago->fecha);

    // Verifica el tipo de pago y actualiza la fecha correspondiente
    if ($pago->tipo === 'mensual') {
        $fechaActual->modify('+1 month');
    } elseif ($pago->tipo === 'anual') {
        $fechaActual->modify('+1 year');
    } elseif ($pago->tipo === 'bimestral') {
        $fechaActual->modify('+2 months');
    }

    $pago->fecha = $fechaActual->format('Y-m-d');
    $pago->save();

    return response()->json(['mensaje' => 'Pago marcado como pagado', 'pago' => $pago]);
}
}
