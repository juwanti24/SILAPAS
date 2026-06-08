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
Schema::create('pembinas', function (Blueprint $table) {
    $table->id('id_pembina');
    $table->string('nama_pembina');
    $table->string('jenis_kelamin');
    $table->string('no_hp')->nullable();
    $table->text('alamat')->nullable();
    $table->timestamps();
});    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pembinas');
    }
};
