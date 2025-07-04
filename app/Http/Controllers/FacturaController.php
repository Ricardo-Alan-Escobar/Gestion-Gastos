<?php

namespace App\Http\Controllers;

use App\Models\Factura;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class FacturaController extends Controller
{
    public function index()
    {
        $facturas = Factura::latest()->get();

        return Inertia::render('facturas', [
            'facturas' => $facturas,
        ]);
    }

    public function upload(Request $request)
    {
        $request->validate([
            'factura' => 'required|file|mimes:pdf|max:5120',
        ]);

        $file = $request->file('factura');
        $path = $file->store('facturas', 'public');

        Factura::create([
            'nombre' => $file->getClientOriginalName(),
            'ruta' => $path,
        ]);

        return redirect()->route('facturas.index')->with('success', 'Factura subida.');
    }

    public function destroy(Factura $factura)
{
    
    if (Storage::disk('public')->exists($factura->ruta)) {
        Storage::disk('public')->delete($factura->ruta);
    }

    $factura->delete();

    return redirect()->route('facturas.index')->with('success', 'Factura eliminada.');
}
}
