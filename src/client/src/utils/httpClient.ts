import axios from 'axios';
import router from 'next/router';
import { paths } from './paths';

/**
 * laravel sanctumドキュメントを参照し「withCredentials:true;」
 * https://readouble.com/laravel/8.x/ja/sanctum.html#spa-authentication
 */
export const httpClient = axios.create({ headers: { 'Content-Type': 'application/json' }, withCredentials: true });

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (e) => {
    if (e.response.status === 401) {
      localStorage.removeItem('auth-token');
      localStorage.removeItem('user-id');
      router.push(paths.accounts.login);
    }
  }
);
