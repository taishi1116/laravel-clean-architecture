import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { BASE_URL } from 'src/utils/constants';
import { httpClient } from 'src/utils/httpClient';

export type ArticlesData = {
  articleId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type FetchArticlesInfo = {
  data: ArticlesData[];
  currentPage: number;
  from: number;
  lastPage: number;
};

export const useArticleList = () => {
  const { enqueueSnackbar } = useSnackbar();
  const FETCH_ARTICLES_ENDPOINT = BASE_URL + '/articles';

  const [loading, setLoading] = useState<boolean>(true);
  const [articlesInfo, setArticleInfo] = useState<FetchArticlesInfo | null>(null);

  const fetchArticlesInfo = async (endpoint: string = FETCH_ARTICLES_ENDPOINT) => {
    try {
      const res = await httpClient.get(endpoint);

      if (res.status === 200) {
        setArticleInfo({
          data: res.data.data.map((o) => {
            return {
              articleId: o.article_id,
              title: o.title,
              content: o.content,
              createdAt: o.created_at,
              updatedAt: o.updated_at,
            };
          }),
          currentPage: res.data.current_page,
          from: res.data.from,
          lastPage: res.data.last_page,
        });
      }
      setLoading(false);
    } catch (e) {
      enqueueSnackbar(e.message, { variant: 'error' });
    }
  };

  useEffect(() => {
    fetchArticlesInfo();
  }, []);

  const handleClickPreOrNextArticle = (pageNumber: number) => {
    setLoading(true);
    fetchArticlesInfo(FETCH_ARTICLES_ENDPOINT + `?page=${pageNumber}`);
  };

  return { loading, articlesInfo, fetchArticlesInfo, handleClickPreOrNextArticle };
};
