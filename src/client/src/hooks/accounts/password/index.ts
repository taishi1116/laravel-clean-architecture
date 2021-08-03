import React, { useContext, useState } from 'react';
import { httpClient } from 'src/utils/httpClient';
import { BASE_URL } from 'src/utils/constants';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { globalContext } from 'src/contexts/globalContext';
import { paths } from 'src/utils/paths';

export type Validator = {
  isValidOldPassword: () => boolean;
  isValidNewPassword: () => boolean;
  canPostNewPassword: () => boolean;
};

export type PasswordHooks = {
  oldPassword: string;
  newPassword: string;
  validator: Validator;
  handleChangeOldPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeNewPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  postNewPassword: () => Promise<void>;
};

export const usePassword = (): PasswordHooks => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { token, userId } = useContext(globalContext);

  const ENDPOINT = BASE_URL + 'user/password';

  const [oldPassword, setOldPassword] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState<string | null>(null);

  const validator = {
    isValidOldPassword: () => oldPassword && oldPassword.length > 0,
    isValidNewPassword: () => newPassword && newPassword.length > 0,
    canPostNewPassword: () => validator.isValidNewPassword() && validator.isValidOldPassword(),
  };

  const handleChangeOldPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
  };

  const handleChangeNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const postNewPassword = async () => {
    try {
      /* eslint-disable @typescript-eslint/camelcase */
      const data = {
        user_id: userId,
        old_password: oldPassword,
        new_password: newPassword,
      };
      const res = await httpClient.post(ENDPOINT, data, { headers: { Authorization: `Bearer ${token}` } });
      if (res.status === 204) {
        enqueueSnackbar('パスワードの変更が完了しました', { variant: 'success' });
        router.push(paths.top);
      }
    } catch (error) {
      enqueueSnackbar('パスワードの変更に失敗しました', { variant: 'error' });
    }
  };

  return { oldPassword, newPassword, validator, handleChangeOldPassword, handleChangeNewPassword, postNewPassword };
};
