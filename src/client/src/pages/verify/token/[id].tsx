import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { BASE_URL } from 'src/utils/constants';
import { paths } from 'src/utils/paths';

const token: React.FC = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = router.query;

  const ENDPOINT = BASE_URL + `/verify/${id}`;

  const postVerifyToken = async () => {
    try {
      const res = await axios.get(ENDPOINT);

      if (res.status === 200) {
        router.push(paths.accounts.register);
      }
    } catch (e) {
      enqueueSnackbar('仮会員登録のトークン認証に失敗しました。会員登録からやり直してください', { variant: 'error' });
      router.push(paths.accounts.preRegister.index);
    }
  };

  useEffect(() => {
    if (id) {
      postVerifyToken();
    }
  }, [id]);
  return null;
};

export default token;
