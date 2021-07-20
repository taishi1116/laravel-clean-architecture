import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { BASE_URL } from 'src/utils/constants';
import { paths } from 'src/utils/paths';
import { useSnackbar } from 'notistack';

export type Validator = {
  hasInputUserName: () => boolean;
  hasInputEmail: () => boolean;
  hasInputPassword: () => boolean;
  isMatchPassword: () => boolean;
  canRegister: () => boolean;
};

export const useRegister = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [inputUserName, setInputUserName] = useState<string | null>(null);
  const [inputEmail, setInputEmail] = useState<string | null>(null);
  const [inputPassword, setInputPassword] = useState<string | null>(null);
  const [inputPasswordConfirmation, setInputPasswordConfirmation] = useState<string | null>(null);

  const emailRegex = /[\w\d_-]+@[\w\d_-]+\.[\w\d._-]+/;

  const ENDPOINT = BASE_URL + 'user';

  /* eslint-disable @typescript-eslint/camelcase */
  const params = {
    name: inputUserName,
    email: inputEmail,
    password: inputPassword,
    password_confirmation: inputPasswordConfirmation,
  };

  const validator: Validator = {
    hasInputUserName: () => inputUserName.length > 0,
    hasInputEmail: () => inputEmail.length > 0 && emailRegex.test(inputEmail),
    hasInputPassword: () => inputPassword.length > 7,
    isMatchPassword: () => inputPassword === inputPasswordConfirmation,
    canRegister: () => {
      return (
        validator.hasInputUserName() &&
        validator.hasInputEmail() &&
        validator.hasInputPassword() &&
        validator.isMatchPassword()
      );
    },
  };

  const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputUserName(e.target.value);
  };
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(e.target.value);
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPassword(e.target.value);
  };
  const handleChangePasswordConfirmation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPasswordConfirmation(e.target.value);
  };

  const postRegisterInfo = async () => {
    try {
      const res = await axios.post(ENDPOINT, params);
      if (res.status === 201) {
        router.push(paths.accounts.login);
      } else {
        // TODO 対応を考える
        throw new Error(res.data.messages);
      }
    } catch (e) {
      enqueueSnackbar('会員登録処理が失敗しました。', { variant: 'error' });
    }
  };

  return {
    inputUserName,
    inputEmail,
    inputPassword,
    inputPasswordConfirmation,
    handleChangeUserName,
    handleChangeEmail,
    handleChangePassword,
    handleChangePasswordConfirmation,
    validator,
    postRegisterInfo,
  };
};
