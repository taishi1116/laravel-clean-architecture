import React, { useContext, useState } from 'react';
import { httpClient } from 'src/utils/httpClient';
import { BASE_URL } from 'src/utils/constants';
import { globalContext } from 'src/contexts/globalContext';
import { useRouter } from 'next/router';
import { paths } from 'src/utils/paths';
import { useSnackbar } from 'notistack';

export const useArticleAdd = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [title, setTitle] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);

  const { token, userId } = useContext(globalContext);

  const ENDPOINT = BASE_URL + '/articles';

  const validator = {
    isValidTitle: () => title && title.length > 0,
    isValidContent: () => content && content.length > 0,
    canPostArticle: () => validator.isValidTitle() && validator.isValidContent,
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const postNewArticle = async () => {
    try {
      const data = {
        // eslint-disable-next-line @typescript-eslint/camelcase
        user_id: userId,
        title,
        content,
      };
      const res = await httpClient.post(ENDPOINT, data, { headers: { Authorization: `Bearer ${token}` } });
      if (res.status === 201) {
        enqueueSnackbar('記事を作成に成功しました。', { variant: 'success' });
        router.push(paths.articles.detail(res.data.article_id));
      }
    } catch (e) {
      enqueueSnackbar('記事の作成に失敗しました。', { variant: 'error' });
    }
  };

  return { title, content, validator, handleChangeTitle, handleChangeContent, postNewArticle };
};
