<?php

namespace App\Http\Controllers;

use App\Models\Proveedor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProveedorController extends Controller
{
    public function index()
    {
        $proveedores = Proveedor::all();

        return Inertia::render('proveedores', [
            'proveedores' => $proveedores
        ]);
    }

    public function store(Request $request)
{
    $request->validate([
        'tipo' => 'required|string',
        'contacto' => 'required|string',
        'telefono' => 'required|string',
        'correo' => 'nullable|email',
        'direccion' => 'nullable|string',
        'sitio_web' => 'nullable|url',
        'notas' => 'nullable|string',
    ]);

    Proveedor::create($request->all());

    return redirect()->route('proveedores.index')->with('success', 'Proveedor creado correctamente');
}

    public function show(Proveedor $proveedor)
    {
        return response()->json($proveedor);
    }
}
