<?php

namespace App\Http\Controllers;

use App\Models\Utilizador;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cookie;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;

class AuthController extends Controller
{

    public function login(LoginRequest $request)
    {
        // Retrieve validated credentials from the request
        $credentials = $request->validated();

        // Retrieve the user by email
        $user = Utilizador::where('email_utilizador', $credentials['email_utilizador'])->first();

        // Check if a user with the provided email exists
        if (!$user) {
            return response()->json([
                'message' => 'Email or password is incorrect'
            ], 422);
        }

        // Check if the provided password matches the hashed password stored in the database
        if (!Hash::check($credentials['password_utilizador'], $user->password_utilizador)) {
            return response()->json([
                'message' => 'Email or password is incorrect'
            ], 422);
        }

        // Authentication successful
        // Generate token for the authenticated user
        $token = $user->createToken('MyAuthApp')->plainTextToken;

        // Construct success response with token and user data
        $response = [
            'token' => $token,
            'user' => $user->nome_utilizador, 
            'id_utilizador'=>$user->id_utilizador,
        
        ];

        // Return success response
        return response()->json($response);
    }

    public function register(RegisterRequest $request)
    {
        $data = $request->validated();

        array_walk_recursive($data, function (&$item, $key) {
            if (is_string($item)) {
                $item = mb_convert_encoding($item, 'UTF-8', 'UTF-8');
            }
        });

        $user = Utilizador::create(([
            'nome_utilizador' => $data['nome_utilizador'],
            'email_utilizador' => $data['email_utilizador'],
            'numero_mecanografico_utilizador' => $data['numero_mecanografico_utilizador'],
            'password_utilizador' => Hash::make($data['password_utilizador']),
            'tipo_utilizador' => $data['tipo_utilizador'],
        ]));

        // Create a token with a specific name
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'data'          => $user,
            'access_token'  => $token,
            'token_type'    => 'Bearer'
        ]);
    }

    public function logout(Request $request)
    {

        Auth::logout();

        // Delete all tokens associated with the user
        $user = $request->user();
        if ($user) {
            $user->tokens()->delete();
        }
    
    }
}
