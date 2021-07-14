import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from 'src/utils/constants';
import router from 'next/router';
import { paths } from 'src/utils/paths';
import { useSnackbar } from 'notistack';

export const usePreRegisterer = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [inputEmail, setInputEmail] = useState<string>('');

  const emailRegex = /[\w\d_-]+@[\w\d_-]+\.[\w\d._-]+/;
  const ENDPOINT = BASE_URL + '/user/pre_register';

  const canApply = {
    hasInputEmail: () => inputEmail.length > 0 && emailRegex.test(inputEmail),
    canRegister: () => {
      return canApply.hasInputEmail();
    },
  };

  const changeStateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(e.target.value);
  };

  const postInputEmail = async () => {
    const params = { email: inputEmail };
    try {
      const res = await axios.post(ENDPOINT, params);
      if (res.status === 201) {
        router.push(paths.accounts.preRegister.done);
      }
    } catch (e) {
      enqueueSnackbar('仮会員登録が失敗しました。', { variant: 'error' });
    }
  };

  return { inputEmail, canApply, changeStateEmail, postInputEmail };
};
