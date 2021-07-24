import React from 'react';

type Props = {
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

// TODO 日時表示とコメント機能
export const ArticleDetail: React.VFC<Props> = ({ title, content }) => {
  return (
    <>
      <div className="w-7/12 mx-auto mb-8">
        <div className={'w-full text-2xl font-bold border-b mb-2'}>{title}</div>
        {/* <div className={'mb-5'}> */}
        {/* <div className={'text-bold  mb-5'}>{postDetail.name}</div> */}
        {/* </div> */}
        <div>
          <p>{content}</p>
        </div>
      </div>
      {/* <PostCommentList comments={comments} />
      <PostCommentInput inputComment={inputComment} setInputComment={setInputComment} postHandler={postHandler} /> */}
      <style jsx>{``}</style>
    </>
  );
};
