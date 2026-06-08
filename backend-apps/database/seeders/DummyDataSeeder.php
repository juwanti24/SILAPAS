<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DummyDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        // Admin
        DB::table('admins')->insert([
            [
                'nama' => 'Admin LPKA',
                'username' => 'admin',
                'password' => Hash::make('password'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // Data Kamar
        DB::table('kamars')->insert([
            [
                'nama_kamar' => 'Kamar A1',
                'blok' => 'Blok A',
                'kapasitas' => 10,
                'status' => 'aktif',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_kamar' => 'Kamar A2',
                'blok' => 'Blok A',
                'kapasitas' => 12,
                'status' => 'aktif',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_kamar' => 'Kamar B1',
                'blok' => 'Blok B',
                'kapasitas' => 8,
                'status' => 'penuh',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // Data Pembina
        DB::table('pembinas')->insert([
            [
                'nama_pembina' => 'Budi Santoso',
                'jenis_kelamin' => 'Laki-laki',
                'no_hp' => '081234567890',
                'alamat' => 'Pekanbaru',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_pembina' => 'Siti Aminah',
                'jenis_kelamin' => 'Perempuan',
                'no_hp' => '082345678901',
                'alamat' => 'Rumbai',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // Data Anak Binaan
        DB::table('anak_binaans')->insert([
            [
                'id_pembina' => 1,
                'nama_anak' => 'Andi Pratama',
                'tanggal_lahir' => '2008-05-12',
                'tanggal_masuk' => '2025-01-10',
                'jenis_kelamin' => 'Laki-laki',
                'alamat' => 'Pekanbaru',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_pembina' => 1,
                'nama_anak' => 'Rizky Ramadhan',
                'tanggal_lahir' => '2007-09-21',
                'tanggal_masuk' => '2025-02-15',
                'jenis_kelamin' => 'Laki-laki',
                'alamat' => 'Kampar',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_pembina' => 2,
                'nama_anak' => 'Dewi Lestari',
                'tanggal_lahir' => '2008-11-03',
                'tanggal_masuk' => '2025-03-01',
                'jenis_kelamin' => 'Perempuan',
                'alamat' => 'Dumai',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // Data Pelanggaran
        DB::table('pelanggarans')->insert([
            [
                'id_anak' => 1,
                'jenis_pelanggaran' => 'Terlambat mengikuti kegiatan',
                'deskripsi' => 'Anak binaan terlambat mengikuti kegiatan pagi.',
                'sanksi' => 'Teguran lisan',
                'tanggal_pelanggaran' => '2025-04-10',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_anak' => 2,
                'jenis_pelanggaran' => 'Tidak menjaga kebersihan kamar',
                'deskripsi' => 'Kamar tidak dirapikan sesuai jadwal piket.',
                'sanksi' => 'Piket tambahan',
                'tanggal_pelanggaran' => '2025-04-15',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // Data Penempatan
        DB::table('penempatans')->insert([
            [
                'id_anak' => 1,
                'id_kamar' => 1,
                'tanggal_penempatan' => '2025-01-10',
                'status_penempatan' => 'aktif',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_anak' => 2,
                'id_kamar' => 1,
                'tanggal_penempatan' => '2025-02-15',
                'status_penempatan' => 'aktif',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_anak' => 3,
                'id_kamar' => 2,
                'tanggal_penempatan' => '2025-03-01',
                'status_penempatan' => 'aktif',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}