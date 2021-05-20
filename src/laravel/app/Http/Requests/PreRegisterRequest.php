<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class PreRegisterRequest extends FormRequest
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
            'mail'  => 'required|email',
        ];
    }

    public function messages()
    {
        return [
            'mail.required' => 'メールアドレスが入力されていません',
            'mail.email' => '正しい形式でメールアドレスを入力してください',
        ];
    }

    /**
     * バリデーション失敗時のエラーハンドリング
     * @param Validator $validator
     * @throw HttpResponseException
     * @see PreRegisterRequest::failedValidation()
     */
    protected function failedValidation(Validator $validator) {
        $res = response()->json([
            'errors' => $validator->errors(),
        ], 400);
        throw new HttpResponseException($res);
    }
}
