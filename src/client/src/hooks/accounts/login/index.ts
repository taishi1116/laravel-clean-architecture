import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { paths } from 'src/utils/paths';
import { useSnackbar } from 'notistack';
import { BASE_URL } from 'src/utils/constants';
import { httpClient } from 'src/utils/httpClient';
import { globalContext } from 'src/contexts/globalContext';

export type Validator = {
  isValidInputEmail: () => boolean;
  isValidInputPassword: () => boolean;
  isValidLogin: () => boolean;
};

export const useLogin = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { setToken, setUserId } = useContext(globalContext);
  const [inputEmail, setInputEmail] = useState<string | null>(null);
  const [inputPassword, setInputPassword] = useState<string | null>(null);

  const emailRegex = /[\w\d_-]+@[\w\d_-]+\.[\w\d._-]+/;

  const LOGIN_ENDPOINT = BASE_URL + '/login';

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(e.target.value);
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPassword(e.target.value);
  };

  const handleClickLogin = async () => {
    try {
      const params = {
        email: inputEmail,
        password: inputPassword,
      };
      const res = await httpClient.post(LOGIN_ENDPOINT, params);
      if (res.status === 200) {
        localStorage.setItem('auth-token', res.data.user.token);
        localStorage.setItem('user-id', res.data.user.user_id);
        setToken(localStorage.getItem('auth-token'));
        setUserId(localStorage.getItem('user-id'));
        router.push(paths.top);
      }
    } catch (e) {
      enqueueSnackbar(e.message, { variant: 'error' });
    }
  };

  const validator: Validator = {
    isValidInputEmail: () => inputEmail && inputEmail.length > 0 && emailRegex.test(inputEmail),
    isValidInputPassword: () => inputPassword && inputPassword.length > 7,
    isValidLogin: () => {
      return validator.isValidInputEmail() && validator.isValidInputPassword();
    },
  };

  return { inputEmail, inputPassword, handleChangeEmail, handleChangePassword, handleClickLogin, validator };
};
