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
    Schema::create('penempatans', function (Blueprint $table) {
        $table->id('id_penempatan');
        $table->unsignedBigInteger('id_anak');
        $table->unsignedBigInteger('id_kamar');
        $table->date('tanggal_penempatan');
        $table->string('status_penempatan')->default('aktif');
        $table->timestamps();

        $table->foreign('id_anak')
            ->references('id_anak')
            ->on('anak_binaans')
            ->cascadeOnDelete();

        $table->foreign('id_kamar')
            ->references('id_kamar')
            ->on('kamars')
            ->cascadeOnDelete();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penempatans');
    }
};
