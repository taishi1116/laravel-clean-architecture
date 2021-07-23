import React from 'react';
import { PostItem } from 'src/components/post/list/PostItem';
import { FetchArticlesInfo } from 'src/hooks/articles/list';

type Props = {
  articlesInfo: FetchArticlesInfo;
};

export const PostList = ({ articlesInfo }: Props) => {
  return (
    <>
      <div className="wrapper w-7/12 mx-auto overflow-y-scroll">
        {articlesInfo.data.map((o, index) => (
          <PostItem articleId={o.articleId} postTitle={o.title} postContent={o.content} key={index} />
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
