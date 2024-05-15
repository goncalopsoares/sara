<?php

namespace App\Http\Controllers;

use App\Models\Utilizador;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\LoginRequest;

class AuthController extends Controller
{
    

    public function login (LoginRequest $request)
    {
        $data=$request->validated();

        if (!Auth::attempt($data)) {
            return response([
                'message'=>'email or password are wrong'
            ]);
        }

        $user=Auth::user();

        $token=$user->createToken('main')->plainTextToken;
        return response()->json(
            [
                'user'=>$user,
                'token'=>$token
            ]);


    }

    public function register (RegisterRequest $request)
    {
        $data=$request->validated();

        array_walk_recursive($data, function (&$item, $key) {
            if (is_string($item)) {
                $item = mb_convert_encoding($item, 'UTF-8', 'UTF-8');
            }
        });

        $user = Utilizador::create(([
            'nome_utilizador'=>$data['nome_utilizador'],
            'email_utilizador'=>$data['email_utilizador'],
            'numero_mecanografico_utilizador'=>$data['numero_mecanografico_utilizador'],
            'password_utilizador'=>Hash::make($data['password_utilizador']),
            'tipo_utilizador'=>$data['tipo_utilizador'],
        ]));

        // Create a token with a specific name
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'data'          => $user,
            'access_token'  => $token,
            'token_type'    => 'Bearer'
        ]);

    }

    public function logout (Request $request)
    {

        $user=$request->user();

        $user->currentAccessToken()->delete();

        return response ('',204);
    }



}
