<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Proveedor extends Model
{
    protected $fillable = [
        'tipo',
        'contacto',
        'telefono',
        'correo',
        'direccion',
        'sitio_web',
        'notas',
    ];
}
