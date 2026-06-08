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
        Schema::create('pelanggarans', function (Blueprint $table) {
            $table->id('id_pelanggaran');
            $table->unsignedBigInteger('id_anak');
            $table->string('jenis_pelanggaran');
            $table->text('deskripsi')->nullable();
            $table->text('sanksi')->nullable();
            $table->date('tanggal_pelanggaran');
            $table->timestamps();

            $table->foreign('id_anak')
                ->references('id_anak')
                ->on('anak_binaans')
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pelanggarans');
    }
};