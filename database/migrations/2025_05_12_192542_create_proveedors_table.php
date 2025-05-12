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
    Schema::create('proveedors', function (Blueprint $table) {
        $table->id();
        $table->string('tipo');
        $table->string('contacto');
        $table->string('telefono');
        $table->string('correo')->nullable();
        $table->string('direccion')->nullable();
        $table->string('sitio_web')->nullable();
        $table->text('notas')->nullable();
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proveedors');
    }
};
