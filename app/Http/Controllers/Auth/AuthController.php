<?php

namespace App\Http\Controllers;

use App\Models\Utilizador;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\RegisterRequest;
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

        $user=Utilizador::create(([
            'nome_utilizador'=>$data['nome_utilizador'],
            'email_utilizador'=>$data['email_utilizador'],
            'numero_mecanografico_utilizador'=>$data['numero_mecanografico_utilizador'],
            'password_utilizador'=>bcrypt($data['password_utilizador']),
        ]));

        $token=$user->createToken('main')->plainTextToken;
        return response()->json(
            [
                'user'=>$user,
                'token'=>$token
            ]);
    }

    public function logout (Request $request)
    {

        $user=$request->user();

        $user->currentAccessToken()->delete();

        return response ('',204);
    }



}
