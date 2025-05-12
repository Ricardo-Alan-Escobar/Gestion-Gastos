<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProveedorController;
use App\Http\Controllers\PagoController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [PagoController::class, 'index'])->name('dashboard');
    Route::post('/pagos', [PagoController::class, 'store'])->name('pagos.store');
    Route::put('/pagos/{pago}', [PagoController::class, 'update']);
Route::delete('/pagos/{pago}', [PagoController::class, 'destroy']);
Route::get('/pagos', [PagoController::class, 'index']);
Route::put('/pagos/{pago}/marcar-pagado', [PagoController::class, 'marcarComoPagado']);
Route::get('/proveedores', [ProveedorController::class, 'index'])->name('proveedores.index');
Route::post('/proveedores', [ProveedorController::class, 'store'])->name('proveedores.store');
Route::get('/proveedores/{proveedor}', [ProveedorController::class, 'show'])->name('proveedores.show');
});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('facturas', function () {
        return Inertia::render('facturas');
    })->name('facturas');
});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('proveedores', function () {
        return Inertia::render('proveedores');
    })->name('proveedores');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
