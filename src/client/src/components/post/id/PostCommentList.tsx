import React from 'react';
import { PostCommentItem } from 'src/components/post/id/PostCommentItem';
import { PostCommentList as PostCommentListType } from './PostDetail';

type Props = {
  comments: PostCommentListType[];
};

export const PostCommentList: React.FC<Props> = ({ comments }) => {
  return (
    <div className="w-7/12 mx-auto">
      <div className={'w-full text-2xl font-bold border-b mb-2'}>コメント</div>
      {comments.map((o, index) => (
        <>
          <PostCommentItem name={o.name} comment={o.comment} commentTime={o.commentTime} key={index} />
          <div className={'w-full border-b border-gray my-5'} />
        </>
      ))}
    </div>
  );
};
