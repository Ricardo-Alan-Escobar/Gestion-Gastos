<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pago extends Model
{
    protected $fillable = ['nombre', 'tipo', 'monto', 'fecha'];
}
