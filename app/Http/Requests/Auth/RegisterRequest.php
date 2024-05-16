<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {

        return [
            'nome_utilizador' => 'required|string|max:255',
            'email_utilizador' => 'required|string|email|max:255|unique:utilizador',
            'numero_mecanografico_utilizador' => 'required|integer|unique:utilizador',
            'password_utilizador' =>['required', Password::defaults()],
            'tipo_utilizador' => 'required|integer|in: 1,2,3', 
        ];
    }
}