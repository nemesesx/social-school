<?php

namespace App\Http\Requests\Api;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UserProfileRequest extends FormRequest
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
    public function rules(Request $request): array
    {
        return [
            'picture' => [
                'nullable',
                'image',
            ],
            'bio' => [
                'nullable',
                'string',
            ],
            'name' => [
                'required',
                'string',
            ],
            'email' => [
                'required',
                Rule::unique('users')->ignore($request->user()->id),
            ]
        ];
    }
}
