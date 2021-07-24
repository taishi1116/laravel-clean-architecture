import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import { BASE_URL } from 'src/utils/constants';
import { httpClient } from 'src/utils/httpClient';

type ArticleDetail = {
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export const useArticleDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const { enqueueSnackbar } = useSnackbar();

  const [articleDetail, setArticleDetail] = useState<ArticleDetail | null>({
    title: '',
    content: '',
    createdAt: '',
    updatedAt: '',
  });
  const [loading, setLoading] = useState<boolean>(true);

  const ENDPOINT = BASE_URL + `/articles/${id}`;

  const fetchArticleDetail = async () => {
    try {
      const res = await httpClient.get(ENDPOINT);
      if (res.status == 200) {
        setArticleDetail({
          title: res.data.title,
          content: res.data.content,
          createdAt: res.data.created_at,
          updatedAt: res.data.updated_at,
        });
        setLoading(false);
      }
    } catch (e) {
      enqueueSnackbar('記事情報の取得エラー', { variant: 'error' });
    }
  };

  useEffect(() => {
    fetchArticleDetail();
  }, []);

  return { articleDetail, loading };
};
