import axios from 'axios';

/**
 * laravel sanctumドキュメントを参照し「withCredentials:true;」
 * https://readouble.com/laravel/8.x/ja/sanctum.html#spa-authentication
 */
export const httpClient = axios.create({ headers: { 'Content-Type': 'application/json' }, withCredentials: true });
