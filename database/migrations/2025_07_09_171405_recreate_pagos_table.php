<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::dropIfExists('pagos'); 

    Schema::create('pagos', function (Blueprint $table) {
        $table->id();
        $table->string('nombre');
        $table->enum('tipo', ['mensual', 'anual', 'bimestral']);
        $table->decimal('monto', 10, 2);
        $table->date('fecha');
         $table->string('icono')->nullable();
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
