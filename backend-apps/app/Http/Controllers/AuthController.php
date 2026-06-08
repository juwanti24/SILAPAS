<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        $admin = Admin::where('username', $request->username)->first();

        if (!$admin) {
            return response()->json([
                'message' => 'Username tidak ditemukan',
            ], 404);
        }

        if (!Hash::check($request->password, $admin->password)) {
            return response()->json([
                'message' => 'Password salah',
            ], 401);
        }

        return response()->json([
            'message' => 'Login berhasil',
            'user' => [
                'id_admin' => $admin->id_admin,
                'nama' => $admin->nama,
                'username' => $admin->username,
                'role' => 'admin',
            ],
        ], 200);
    }
}