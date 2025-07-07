<?php 

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProveedorController;
use App\Http\Controllers\PagoController;
use App\Http\Controllers\FacturaController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard y pagos
    Route::get('/dashboard', [PagoController::class, 'index'])->name('dashboard');
    Route::post('/pagos', [PagoController::class, 'store'])->name('pagos.store');
    Route::put('/pagos/{pago}', [PagoController::class, 'update']);
    Route::delete('/pagos/{pago}', [PagoController::class, 'destroy']);
    Route::get('/pagos', [PagoController::class, 'index']);
    Route::put('/pagos/{pago}/marcar-pagado', [PagoController::class, 'marcarComoPagado']);

    // Proveedores
    Route::get('/proveedores', [ProveedorController::class, 'index'])->name('proveedores.index');
    Route::post('/proveedores', [ProveedorController::class, 'store'])->name('proveedores.store');
    Route::get('/proveedores/{proveedor}', [ProveedorController::class, 'show'])->name('proveedores.show');
    Route::put('/proveedores/{proveedor}', [ProveedorController::class, 'update'])->name('proveedores.update');
    Route::delete('/proveedores/{proveedor}', [ProveedorController::class, 'destroy'])->name('proveedores.destroy');


    // Facturas (PDFs)
    Route::get('/facturas', [FacturaController::class, 'index'])->name('facturas.index');
    Route::post('/facturas/upload', [FacturaController::class, 'upload'])->name('facturas.upload');
    Route::delete('/facturas/{factura}', [FacturaController::class, 'destroy'])->name('facturas.destroy');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
