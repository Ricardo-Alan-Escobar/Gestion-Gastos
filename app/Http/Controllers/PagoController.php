<?php

namespace App\Http\Controllers;

use App\Models\Pago;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Notificacion;
use Carbon\Carbon;
use App\Models\User;
use App\Notifications\NotificacionCorreo;

class PagoController extends Controller
{
    
public function index(Request $request)
{
    $pagos = Pago::all();

    // Fecha de hoy
    $hoy = Carbon::today()->format('Y-m-d');

    // Verificar si hay pagos para hoy y no se ha notificado aún (opcional)
    foreach ($pagos as $pago) {
        if ($pago->fecha === $hoy) {
            // Verificamos si ya existe una notificación para evitar duplicados
            $existe = Notificacion::where('titulo', 'Pago vence hoy')
                ->where('mensaje', "El pago '{$pago->nombre}' vence hoy ({$pago->fecha}).")
                ->whereDate('created_at', $hoy)
                ->exists();

            if (!$existe) {
    $titulo = 'Pago vence hoy';
    $mensaje = "El pago '{$pago->nombre}' vence hoy ({$pago->fecha}).";

    // Guardar en base de datos
    Notificacion::create([
        'titulo' => $titulo,
        'mensaje' => $mensaje,
    ]);

    // Enviar notificación por correo a todos los usuarios
    $usuarios = User::all();
    foreach ($usuarios as $usuario) {
        $usuario->notify(new NotificacionCorreo($titulo, $mensaje));
    }
}

        }
    }

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
            'tipo' => 'required|in:mensual,anual,bimestral',
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

    // Crear notificación manual
   $titulo = 'Pago marcado como pagado';
$mensaje = "El pago '{$pago->nombre}' fue marcado como pagado y su nueva fecha es {$pago->fecha}.";

// Base de datos
Notificacion::create([
    'titulo' => $titulo,
    'mensaje' => $mensaje,
]);

// Correo
$usuarios = User::all();
foreach ($usuarios as $usuario) {
    $usuario->notify(new NotificacionCorreo($titulo, $mensaje));
}


    return response()->json(['mensaje' => 'Pago marcado como pagado', 'pago' => $pago]);
}

public function reportes()
{
    $pagos = \App\Models\Pago::all();
$hoy = Carbon::today()->format('Y-m-d');


foreach ($pagos as $pago) {
    if ($pago->fecha === $hoy) {
        $existe = \App\Models\Notificacion::where('titulo', 'Pago vence hoy')
            ->where('mensaje', "El pago '{$pago->nombre}' vence hoy ({$pago->fecha}).")
            ->whereDate('created_at', $hoy)
            ->exists();

        if (!$existe) {
    $titulo = 'Pago vence hoy';
    $mensaje = "El pago '{$pago->nombre}' vence hoy ({$pago->fecha}).";

    \App\Models\Notificacion::create([
        'titulo' => $titulo,
        'mensaje' => $mensaje,
    ]);

    $usuarios = \App\Models\User::all();
    foreach ($usuarios as $usuario) {
        $usuario->notify(new \App\Notifications\NotificacionCorreo($titulo, $mensaje));
    }
}

    }
}
    // Agrupación por mes
    $datosMensuales = $pagos->groupBy(function ($pago) {
        return Carbon::parse($pago->fecha)->locale('es')->translatedFormat('F');

    })->map(function ($grupo) {
        return [
            'mes' => $grupo->first()->fecha ? Carbon::parse($grupo->first()->fecha)->format('F') : 'Sin Fecha',
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
        'fecha' => Carbon::parse($pago->fecha)->format('Y-m-d'),
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
