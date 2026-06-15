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

// =====================
// PEMBINA
// =====================
Route::get('/pembinas', function () {
    return response()->json(DB::table('pembinas')->get());
});

Route::get('/pembinas/{id}', function ($id) {
    $pembina = DB::table('pembinas')->where('id_pembina', $id)->first();
    if (!$pembina) {
        return response()->json(['message' => 'Pembina tidak ditemukan'], 404);
    }
    return response()->json($pembina);
});

// =====================
// ANAK BINAAN
// ⚠️ Route tanpa parameter HARUS di atas route dengan {id}
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


// =====================
// PELANGGARAN
// ⚠️ Hanya 1 route — duplikat dihapus
// =====================
Route::get('/pelanggarans', function (Request $request) {
    $idAnak = $request->query('id_anak', '');

    $data = DB::table('pelanggarans')
        ->when($idAnak, function ($query) use ($idAnak) {
            $query->where('id_anak', $idAnak);
        })
        ->get();

    return response()->json($data);
});

// =====================
// PENEMPATAN
// ⚠️ Hanya 1 route — duplikat dihapus
// =====================
Route::get('/penempatans', function (Request $request) {
    $idAnak = $request->query('id_anak', '');

    $data = DB::table('penempatans')
        ->when($idAnak, function ($query) use ($idAnak) {
            $query->where('id_anak', $idAnak);
        })
        ->get();

    return response()->json($data);
});
