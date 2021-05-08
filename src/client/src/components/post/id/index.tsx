import React from 'react';
import { useRouter } from 'next/router';
import { PagesHeader } from 'src/components/header/PagesHeader';
import { PostDetail } from 'src/components/post/id/PostDetail';

export const PostDetailUI = () => {
  const router = useRouter();

  return (
    <>
      <PagesHeader title="記事詳細" onClick={() => router.back()} />
      <PostDetail />
    </>
  );
};
