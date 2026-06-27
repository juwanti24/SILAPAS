<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Models\Admin;

// =====================
// AUTH
// =====================
Route::post('/login', function (Request $request) {
    $admin = Admin::where('username', $request->username)->first();
    if (!$admin) {
        return response()->json(['message' => 'Username tidak ditemukan'], 401);
    }
    if (!Hash::check($request->password, $admin->password)) {
        return response()->json(['message' => 'Password salah'], 401);
    }
    return response()->json([
        'message' => 'Login berhasil',
        'user' => [
            'id_admin' => $admin->id_admin,
            'nama'     => $admin->nama,
            'username' => $admin->username,
            'role'     => 'admin',
        ]
    ]);
});

// =====================
// KAMAR
// =====================
Route::get('/kamars', function () {
    return response()->json(DB::table('kamars')->get());
});

Route::get('/kamars/{id}', function ($id) {
    $kamar = DB::table('kamars')->where('id_kamar', $id)->first();
    if (!$kamar) {
        return response()->json(['message' => 'Kamar tidak ditemukan'], 404);
    }
    return response()->json($kamar);
});

Route::post('/kamars', function (Request $request) {
    $id = DB::table('kamars')->insertGetId([
        'nama_kamar' => $request->nama_kamar,
        'blok'       => $request->blok,
        'kapasitas'  => $request->kapasitas,
        'status'     => $request->status ?? 'Aktif',
        'created_at' => now(),
        'updated_at' => now(),
    ]);
    return response()->json(DB::table('kamars')->where('id_kamar', $id)->first(), 201);
});

Route::put('/kamars/{id}', function (Request $request, $id) {
    DB::table('kamars')->where('id_kamar', $id)->update([
        'nama_kamar' => $request->nama_kamar,
        'blok'       => $request->blok,
        'kapasitas'  => $request->kapasitas,
        'status'     => $request->status,
        'updated_at' => now(),
    ]);
    return response()->json(['message' => 'Kamar berhasil diperbarui']);
});

// DELETE kamar — cek dulu apakah masih ada penghuni
Route::delete('/kamars/{id}', function ($id) {
    $jumlahPenghuni = DB::table('penempatans')
        ->where('id_kamar', $id)
        ->count();

    if ($jumlahPenghuni > 0) {
        return response()->json([
            'message' => "Kamar tidak bisa dihapus karena masih ada {$jumlahPenghuni} anak binaan yang menempati. Kosongkan kamar terlebih dahulu."
        ], 422);
    }

    DB::table('kamars')->where('id_kamar', $id)->delete();
    return response()->json(['message' => 'Kamar berhasil dihapus']);
});

// =====================
// PEMBINA
// =====================
Route::get('/pembinas', function () {
    return response()->json(DB::table('pembinas')->get());
});

Route::post('/pembinas', function (Request $request) {

    $id = DB::table('pembinas')->insertGetId([
        'nama_pembina' => $request->nama_pembina,
        'jenis_kelamin' => $request->jenis_kelamin,
        'no_hp' => $request->no_hp,
        'alamat' => $request->alamat,
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    return response()->json([
        'message' => 'Pembina berhasil ditambahkan',
        'id_pembina' => $id
    ]);
});

Route::get('/pembinas/{id}', function ($id) {
    $pembina = DB::table('pembinas')->where('id_pembina', $id)->first();
    if (!$pembina) {
        return response()->json(['message' => 'Pembina tidak ditemukan'], 404);
    }
    return response()->json($pembina);
});

Route::post('/pembinas', function (Request $request) {
    $id = DB::table('pembinas')->insertGetId([
        'nama_pembina'  => $request->nama_pembina,
        'jenis_kelamin' => $request->jenis_kelamin,
        'no_hp'         => $request->no_hp,
        'alamat'        => $request->alamat,
        'created_at'    => now(),
        'updated_at'    => now(),
    ]);
    return response()->json([
        'message'    => 'Pembina berhasil ditambahkan',
        'id_pembina' => $id
    ]);
});

Route::put('/pembinas/{id}', function (Request $request, $id) {
    DB::table('pembinas')->where('id_pembina', $id)->update([
        'nama_pembina'  => $request->nama_pembina,
        'jenis_kelamin' => $request->jenis_kelamin,
        'no_hp'         => $request->no_hp,
        'alamat'        => $request->alamat,
        'updated_at'    => now(),
    ]);
    return response()->json(['message' => 'Pembina berhasil diupdate']);
});

Route::delete('/pembinas/{id}', function ($id) {
    DB::table('pembinas')->where('id_pembina', $id)->delete();
    return response()->json(['message' => 'Pembina berhasil dihapus']);
});

// =====================
// ANAK BINAAN
// ⚠️ Route tanpa {id} HARUS di atas route dengan {id}
// =====================
Route::get('/anak-binaans', function (Request $request) {
    $search = $request->query('search', '');
    $data = DB::table('anak_binaans')
        ->when($search, function ($query) use ($search) {
            $query->where('nama_anak', 'like', "%{$search}%");
        })
        ->get();
    return response()->json($data);
});

Route::get('/anak-binaans/{id}', function ($id) {
    $anak = DB::table('anak_binaans')->where('id_anak', $id)->first();
    if (!$anak) {
        return response()->json(['message' => 'Data tidak ditemukan'], 404);
    }
    return response()->json($anak);
});

Route::post('/anak-binaans', function (Request $request) {
    $id = DB::table('anak_binaans')->insertGetId([
        'nama_anak'     => $request->nama_anak,
        'tanggal_lahir' => $request->tanggal_lahir,
        'tanggal_masuk' => $request->tanggal_masuk,
        'jenis_kelamin' => $request->jenis_kelamin,
        'alamat'        => $request->alamat,
        'id_pembina'    => $request->id_pembina ?: null,
        'created_at'    => now(),
        'updated_at'    => now(),
    ]);
    return response()->json([
        'message' => 'Anak binaan berhasil ditambahkan',
        'id_anak' => $id
    ]);
});

Route::put('/anak-binaans/{id}', function (Request $request, $id) {
    DB::table('anak_binaans')->where('id_anak', $id)->update([
        'nama_anak'     => $request->nama_anak,
        'tanggal_lahir' => $request->tanggal_lahir,
        'tanggal_masuk' => $request->tanggal_masuk,
        'jenis_kelamin' => $request->jenis_kelamin,
        'alamat'        => $request->alamat,
        'id_pembina'    => $request->id_pembina ?: null,
        'updated_at'    => now(),
    ]);
    return response()->json(['message' => 'Data anak berhasil diperbarui']);
});

Route::delete('/anak-binaans/{id}', function ($id) {
    DB::table('anak_binaans')->where('id_anak', $id)->delete();
    return response()->json(['message' => 'Data anak berhasil dihapus']);
});

// =====================
// PELANGGARAN
// =====================
Route::get('/pelanggarans', function (Request $request) {
    $idAnak = $request->query('id_anak', '');
    $data = DB::table('pelanggarans')
        ->join('anak_binaans', 'pelanggarans.id_anak', '=', 'anak_binaans.id_anak')
        ->select(
            'pelanggarans.id_pelanggaran',
            'pelanggarans.id_anak',
            'anak_binaans.nama_anak',
            'pelanggarans.jenis_pelanggaran',
            'pelanggarans.deskripsi',
            'pelanggarans.sanksi',
            'pelanggarans.tanggal_pelanggaran',
            'pelanggarans.status'
        )
        ->when($idAnak, function ($query) use ($idAnak) {
            $query->where('pelanggarans.id_anak', $idAnak);
        })
        ->orderBy('pelanggarans.tanggal_pelanggaran', 'desc')
        ->get();
    return response()->json($data);
});

Route::post('/pelanggarans', function (Request $request) {
    $id = DB::table('pelanggarans')->insertGetId([
        'id_anak'             => $request->id_anak,
        'jenis_pelanggaran'   => $request->jenis_pelanggaran,
        'deskripsi'           => $request->deskripsi,
        'sanksi'              => $request->sanksi,
        'tanggal_pelanggaran' => $request->tanggal_pelanggaran,
        'status'              => 'Belum Selesai',
        'created_at'          => now(),
        'updated_at'          => now(),
    ]);
    return response()->json([
        'message'        => 'Pelanggaran berhasil ditambahkan',
        'id_pelanggaran' => $id
    ], 201);
});

Route::put('/pelanggarans/{id}', function (Request $request, $id) {
    DB::table('pelanggarans')
        ->where('id_pelanggaran', $id)
        ->update([
            'jenis_pelanggaran'   => $request->jenis_pelanggaran,
            'deskripsi'           => $request->deskripsi,
            'sanksi'              => $request->sanksi,
            'tanggal_pelanggaran' => $request->tanggal_pelanggaran,
            'status'              => $request->status,
            'updated_at'          => now(),
        ]);
    return response()->json(['message' => 'Pelanggaran berhasil diperbarui']);
});

// =====================
// PENEMPATAN
// =====================
Route::get('/penempatans', function () {
    return response()->json(DB::table('penempatans')->get());
});

Route::get('/penempatan-dashboard', function () {
    $kamars = DB::table('kamars')->get();
    foreach ($kamars as $kamar) {
        $kamar->penghuni = DB::table('penempatans')
            ->join('anak_binaans', 'penempatans.id_anak', '=', 'anak_binaans.id_anak')
            ->where('penempatans.id_kamar', $kamar->id_kamar)
            ->select('anak_binaans.id_anak', 'anak_binaans.nama_anak', 'penempatans.id_penempatan')
            ->get();
        $kamar->jumlah_penghuni = count($kamar->penghuni);
    }
    return response()->json($kamars);
});

Route::get('/anak-belum-ditempatkan', function () {
    return response()->json(
        DB::table('anak_binaans')
            ->whereNotIn('id_anak', DB::table('penempatans')->pluck('id_anak'))
            ->get()
    );
});

Route::post('/penempatans', function (Request $request) {
    $kamar = DB::table('kamars')->where('id_kamar', $request->id_kamar)->first();
    if (!$kamar) {
        return response()->json(['message' => 'Kamar tidak ditemukan'], 404);
    }
    $jumlah = DB::table('penempatans')->where('id_kamar', $request->id_kamar)->count();
    if ($jumlah >= $kamar->kapasitas) {
        return response()->json(['message' => 'Kamar tidak tersedia'], 422);
    }
    DB::table('penempatans')->insert([
        'id_anak'            => $request->id_anak,
        'id_kamar'           => $request->id_kamar,
        'tanggal_penempatan' => now(),
        'status_penempatan'  => 'aktif',
        'created_at'         => now(),
        'updated_at'         => now(),
    ]);
    return response()->json(['message' => 'Penempatan berhasil']);
});

Route::put('/penempatans/{id}', function (Request $request, $id) {
    $kamar = DB::table('kamars')->where('id_kamar', $request->id_kamar)->first();
    if (!$kamar) {
        return response()->json(['message' => 'Kamar tidak ditemukan'], 404);
    }
    $jumlah = DB::table('penempatans')
        ->where('id_kamar', $request->id_kamar)
        ->where('id_penempatan', '!=', $id)
        ->count();
    if ($jumlah >= $kamar->kapasitas) {
        return response()->json(['message' => 'Kamar tidak tersedia'], 422);
    }
    DB::table('penempatans')->where('id_penempatan', $id)->update([
        'id_kamar'   => $request->id_kamar,
        'updated_at' => now(),
    ]);
    return response()->json(['message' => 'Penempatan berhasil diperbarui']);
});
