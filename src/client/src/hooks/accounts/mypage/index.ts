import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, { useContext, useState } from 'react';
import { globalContext } from 'src/contexts/globalContext';
import { BASE_URL } from 'src/utils/constants';
import { httpClient } from 'src/utils/httpClient';
import { paths } from 'src/utils/paths';

export const useMypage = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { token } = useContext(globalContext);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const GET_USER_INFO_ENDPOINT = BASE_URL + '/user';
  const UPDATE_USER_INFO_ENDPOINT = BASE_URL + `/user/${userId}`;

  const emailRegex = /[\w\d_-]+@[\w\d_-]+\.[\w\d._-]+/;

  const validator = {
    isValidUserName: () => userName && userName.length > 0,
    isValidEmail: () => email && email.length > 0 && emailRegex.test(email),
    isValidPassword: () => password && password.length > 7,
    canUserInfoUpdate: () => validator.isValidUserName() && validator.isValidEmail(),
  };

  const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const getUserInfo = async () => {
    try {
      const res = await httpClient.get(GET_USER_INFO_ENDPOINT, { headers: { Authorization: `Bearer ${token}` } });
      if (res.status === 200) {
        setUserId(res.data.user.user_id);
        setUserName(res.data.user.name);
        setEmail(res.data.user.email);
      }
    } catch (e) {
      enqueueSnackbar('ユーザ情報の取得に失敗しました', { variant: 'error' });
    }
  };

  const updateUserInfo = async () => {
    try {
      const param = {
        name: userName,
        email: email,
        password: password,
      };

      const res = await httpClient.put(UPDATE_USER_INFO_ENDPOINT, param);
      if (res.status === 201) {
        enqueueSnackbar('ユーザー情報を更新しました', { variant: 'success' });
        router.push(paths.top);
      }
    } catch {
      enqueueSnackbar('ユーザ情報の更新に失敗しました', { variant: 'error' });
    }
  };

  return {
    userName,
    email,
    validator,
    handleChangeUserName,
    handleChangeEmail,
    handleChangePassword,
    getUserInfo,
    updateUserInfo,
  };
};
