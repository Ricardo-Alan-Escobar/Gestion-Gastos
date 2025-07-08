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

public function reportes()
{
    $pagos = \App\Models\Pago::all();

    // Agrupación por mes
    $datosMensuales = $pagos->groupBy(function ($pago) {
        return \Carbon\Carbon::parse($pago->fecha)->locale('es')->translatedFormat('F');
    })->map(function ($grupo) {
        return [
            'mes' => $grupo->first()->fecha ? \Carbon\Carbon::parse($grupo->first()->fecha)->format('F') : 'Sin Fecha',
            'total' => $grupo->sum('monto'),
        ];
    })->values();

    // Agrupación por tipo (categorías)
    $datosCategorias = $pagos->groupBy('tipo')->map(function ($grupo, $tipo) {
        return [
            'name' => ucfirst($tipo),
            'value' => $grupo->sum('monto'),
        ];
    })->values();

    // Tabla últimos registros (últimos 5 pagos)
   $ultimos = $pagos->sortByDesc('fecha')->take(5)->map(function ($pago) {
    return [
        'id' => $pago->id,
        'titulo' => $pago->nombre,
        'fecha' => \Carbon\Carbon::parse($pago->fecha)->format('Y-m-d'),
        'estado' => 'Revisado',
    ];
})->values(); // <-- esto convierte a array secuencial


    // Resumen
    $resumen = [
        [
            'titulo' => 'Total Reportes',
            'valor' => $pagos->count()
        ],
        [
            'titulo' => 'Ingresos del Mes',
            'valor' => '$' . number_format($pagos->where('tipo', 'mensual')->sum('monto'), 2)
        ],
        [
            'titulo' => 'Gastos del Mes',
            'valor' => '$' . number_format($pagos->where('tipo', 'anual')->sum('monto'), 2)
        ],
        [
            'titulo' => 'Balance',
            'valor' => '$' . number_format($pagos->sum('monto'), 2)
        ],
    ];

    return Inertia::render('reportes', [
        'resumen' => $resumen,
        'datosMensuales' => $datosMensuales,
        'datosCategorias' => $datosCategorias,
        'ultimos' => $ultimos,
    ]);
}


}
