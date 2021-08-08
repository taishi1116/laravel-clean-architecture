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

  const [inputBase64RepresentativeImage, setBase64RepresentativeImage] = useState<string | ArrayBuffer | null>(null);
  const [inputUserName, setInputUserName] = useState<string | null>(null);
  const [inputEmail, setInputEmail] = useState<string | null>(null);
  const [inputPassword, setInputPassword] = useState<string | null>(null);
  const [inputPasswordConfirmation, setInputPasswordConfirmation] = useState<string | null>(null);

  const emailRegex = /[\w\d_-]+@[\w\d_-]+\.[\w\d._-]+/;

  const ENDPOINT = BASE_URL + '/user';

  const validator: Validator = {
    hasInputUserName: () => inputUserName && inputUserName.length > 0,
    hasInputEmail: () => inputEmail && inputEmail.length > 0 && emailRegex.test(inputEmail),
    hasInputPassword: () => inputPassword && inputPassword.length > 7,
    isMatchPassword: () => inputPassword && inputPassword === inputPasswordConfirmation,
    canRegister: () => {
      return (
        validator.hasInputUserName() &&
        validator.hasInputEmail() &&
        validator.hasInputPassword() &&
        validator.isMatchPassword()
      );
    },
  };

  const handleChangeBase64RepresentativeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setBase64RepresentativeImage(reader.result);
    };
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
      const replaceInputBase64RepresentativeImage = inputBase64RepresentativeImage
        .toString()
        .replace(/data:.*\/.*;base64,/, '');

      const params = {
        // eslint-disable-next-line @typescript-eslint/camelcase
        representative_image: replaceInputBase64RepresentativeImage,
        name: inputUserName,
        email: inputEmail,
        password: inputPassword,
        // eslint-disable-next-line @typescript-eslint/camelcase
        password_confirmation: inputPasswordConfirmation,
      };
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
    inputBase64RepresentativeImage,
    inputUserName,
    inputEmail,
    inputPassword,
    inputPasswordConfirmation,
    handleChangeBase64RepresentativeImage,
    handleChangeUserName,
    handleChangeEmail,
    handleChangePassword,
    handleChangePasswordConfirmation,
    validator,
    postRegisterInfo,
  };
};
