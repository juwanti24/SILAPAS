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
        Schema::create('anak_binaans', function (Blueprint $table) {
            $table->id('id_anak');
            $table->unsignedBigInteger('id_pembina')->nullable();
            $table->string('nama_anak');
            $table->date('tanggal_lahir');
            $table->date('tanggal_masuk');
            $table->string('jenis_kelamin');
            $table->text('alamat')->nullable();
            $table->timestamps();

            $table->foreign('id_pembina')
                ->references('id_pembina')
                ->on('pembinas')
                ->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('anak_binaans');
    }
};