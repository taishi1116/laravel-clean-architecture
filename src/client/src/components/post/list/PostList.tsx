import React from 'react';
import { PostItem } from 'src/components/post/list/PostItem';
import { PostLists } from 'src/components/post/list';

type Props = {
  postLists: PostLists[];
  pageNumber: number;
};

export const PostList = ({ postLists, pageNumber }: Props) => {
  const splitPosts = (array, n) =>
    array.reduce((a, c, i) => (i % n == 0 ? [...a, [c]] : [...a.slice(0, -1), [...a[a.length - 1], c]]), []);

  const postListAtPageNumber = splitPosts(postLists, 20);

  return (
    <>
      <div className="wrapper w-7/12 mx-auto overflow-y-scroll">
        {postListAtPageNumber[pageNumber - 1]?.map((o, index) => (
          <PostItem postId={o.postId} postTitle={o.title} postContent={o.content} key={index} />
        ))}
      </div>
      <style jsx>{`
        .wrapper {
          height: 70vh;
        }
      `}</style>
    </>
  );
};
