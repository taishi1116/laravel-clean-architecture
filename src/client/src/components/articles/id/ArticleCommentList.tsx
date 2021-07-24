import React from 'react';
// import { ArticleCommentItem } from 'src/components/articles/id/ArticleCommentItem';
// import { ArticleCommentList } from './ArticleDetail';

export const ArticleCommentList: React.FC = () => {
  return (
    <div className="w-7/12 mx-auto">
      <div className={'w-full text-2xl font-bold border-b mb-2'}>コメント</div>
      {/* {comments.map((o, index) => (
        <>
          <ArticleCommentItem name={o.name} comment={o.comment} commentTime={o.commentTime} key={index} />
          <div className={'w-full border-b border-gray my-5'} />
        </>
      ))} */}
    </div>
  );
};
