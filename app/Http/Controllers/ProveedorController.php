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
        'tipo' => 'required|string|max:255',
        'contacto' => 'required|string|max:255',
        'telefono' => 'nullable|string|max:20',
        'correo' => 'nullable|email|max:255',
        'direccion' => 'nullable|string|max:500',
        'sitio_web' => 'nullable|url|max:255',
        'notas' => 'nullable|string|max:1000',
    ]);

    Proveedor::create($request->all());

    return redirect()->route('proveedores.index')
        ->with('success', 'Proveedor creado correctamente');
}

    public function show(Proveedor $proveedor)
    {
        return response()->json($proveedor);
    }
     public function update(Request $request, Proveedor $proveedor)
    {
        $request->validate([
            'tipo' => 'required|string|max:255',
            'contacto' => 'required|string|max:255',
            'telefono' => 'nullable|string|max:20',
            'correo' => 'nullable|email|max:255',
            'direccion' => 'nullable|string|max:500',
            'sitio_web' => 'nullable|url|max:255',
            'notas' => 'nullable|string|max:1000',
        ]);

        $proveedor->update($request->all());

        return redirect()->route('proveedores.index')
            ->with('success', 'Proveedor actualizado correctamente');
    }

    public function destroy(Proveedor $proveedor)
    {
        $proveedor->delete();

        return redirect()->route('proveedores.index')
            ->with('success', 'Proveedor eliminado correctamente');
    }
}
