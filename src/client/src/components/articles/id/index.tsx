import React from 'react';
import { PagesHeader } from 'src/components/header/PagesHeader';
import { ArticleDetail } from 'src/components/articles/id/ArticleDetail';
import { useArticleDetail } from 'src/hooks/articles/id';
import { Loading } from 'src/components/common/Loading';

export const ArticleDetailUI = () => {
  const { articleDetail, loading } = useArticleDetail();

  const { title, content, createdAt, updatedAt } = articleDetail;

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <PagesHeader title="記事詳細" />
      <ArticleDetail title={title} content={content} createdAt={createdAt} updatedAt={updatedAt} />
    </>
  );
};
