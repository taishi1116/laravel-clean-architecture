import React from 'react';
import { ArticleItem } from 'src/components/articles/list/ArticleItem';
import { FetchArticlesInfo } from 'src/hooks/articles/list';

type Props = {
  articlesInfo: FetchArticlesInfo;
};

export const ArticleList = ({ articlesInfo }: Props) => {
  return (
    <>
      <div className="wrapper w-7/12 mx-auto overflow-y-scroll">
        {articlesInfo.data.map((o, index) => (
          <ArticleItem articleId={o.articleId} postTitle={o.title} postContent={o.content} key={index} />
        ))}
      </div>
      <style jsx>{`
        .wrapper {
          height: 90vh;
        }
      `}</style>
    </>
  );
};
