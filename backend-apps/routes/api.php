<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use App\Models\Admin;


Route::post('/login', function (Request $request) {

    $admin = Admin::where('username', $request->username)->first();

    if (!$admin) {
        return response()->json([
            'message' => 'Username tidak ditemukan'
        ], 401);
    }

    if (!Hash::check($request->password, $admin->password)) {
        return response()->json([
            'message' => 'Password salah'
        ], 401);
    }

    return response()->json([
        'message' => 'Login berhasil',
        'user' => [
            'id_admin' => $admin->id_admin,
            'nama' => $admin->nama,
            'username' => $admin->username,
            'role' => 'admin',
        ]
    ]);
});

use Illuminate\Support\Facades\DB;

Route::get('/kamars', function () {
    return response()->json(DB::table('kamars')->get());
});

Route::get('/pembinas', function () {
    return response()->json(DB::table('pembinas')->get());
});

Route::get('/anak-binaans', function () {
    return response()->json(DB::table('anak_binaans')->get());
});

Route::get('/pelanggarans', function () {
    return response()->json(DB::table('pelanggarans')->get());
});

Route::get('/penempatans', function () {
    return response()->json(DB::table('penempatans')->get());
});