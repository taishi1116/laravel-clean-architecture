<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    // 許可するHTTPリクエストメソッドを指定する(GET,POSTなど)
    'allowed_methods' => ['*'],
    
    // 通信を許可する送信元originを指定
    'allowed_origins' => [env('FRONT_URL', 'http://localhost:3000')],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    // https://readouble.com/laravel/8.x/ja/sanctum.html#spa-authentication
    'supports_credentials' => true,

];
