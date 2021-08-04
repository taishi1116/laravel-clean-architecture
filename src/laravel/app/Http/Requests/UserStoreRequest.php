<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class UserStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name'=> 'required',
            'email' => 'required|email|unique:App\Models\User,email',
            'representative_image' => 'required|image',
            'password' => 'required|min:8|confirmed',
            'password_confirmation'  => 'required|min:8',

        ];
    }

    /**
     * バリデーション失敗時のエラーハンドリング
     * @param Validator $validator
     * @throw HttpResponseException
     * @see PreRegisterRequest::failedValidation()
     */
    protected function failedValidation(Validator $validator)
    {
        $res = response()->json([
            'errors' => $validator->errors(),
        ], 400);
        throw new HttpResponseException($res);
    }
}
