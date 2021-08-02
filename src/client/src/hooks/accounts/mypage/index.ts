import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { globalContext } from 'src/contexts/globalContext';
import { BASE_URL } from 'src/utils/constants';
import { httpClient } from 'src/utils/httpClient';
import { paths } from 'src/utils/paths';

export type Validator = {
  isValidUserName: () => boolean;
  isValidEmail: () => boolean;
  canUserInfoUpdate: () => boolean;
};

export const useMypage = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { token, userId } = useContext(globalContext);

  const [userName, setUserName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const USER_INFO_ENDPOINT = BASE_URL + `/user/${userId}`;

  const emailRegex = /[\w\d_-]+@[\w\d_-]+\.[\w\d._-]+/;

  const validator: Validator = {
    isValidUserName: () => userName && userName.length > 0,
    isValidEmail: () => email && email.length > 0 && emailRegex.test(email),
    canUserInfoUpdate: () => validator.isValidUserName() && validator.isValidEmail(),
  };

  const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const getUserInfo = async () => {
    try {
      const res = await httpClient.get(USER_INFO_ENDPOINT, { headers: { Authorization: `Bearer ${token}` } });
      if (res.status === 200) {
        setUserName(res.data.name);
        setEmail(res.data.email);
        setLoading(false);
      }
    } catch (e) {
      enqueueSnackbar('ユーザ情報の取得に失敗しました', { variant: 'error' });
    }
  };

  const updateUserInfo = async () => {
    try {
      const data = {
        name: userName,
        email: email,
      };

      const res = await httpClient.put(USER_INFO_ENDPOINT, data, { headers: { Authorization: `Bearer ${token}` } });
      if (res.status === 204) {
        enqueueSnackbar('ユーザー情報を更新しました', { variant: 'success' });
        router.push(paths.top);
      }
    } catch (e) {
      enqueueSnackbar('ユーザ情報の更新に失敗しました', { variant: 'error' });
    }
  };

  useEffect(() => {
    if (token && userId) {
      getUserInfo();
    }
  }, [token, userId]);

  return {
    userName,
    email,
    loading,
    validator,
    handleChangeUserName,
    handleChangeEmail,
    getUserInfo,
    updateUserInfo,
  };
};
