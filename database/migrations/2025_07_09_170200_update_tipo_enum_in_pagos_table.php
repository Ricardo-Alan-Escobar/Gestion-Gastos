<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement("ALTER TABLE pagos MODIFY tipo ENUM('mensual', 'anual', 'bimestral') NOT NULL");
    }

    public function down(): void
    {
        // Si antes no estaba 'bimestral', puedes revertir así:
        DB::statement("ALTER TABLE pagos MODIFY tipo ENUM('mensual', 'anual') NOT NULL");
    }
};
