import React, { useEffect, useState } from 'react';
import { PagesHeader } from 'src/components/header/PagesHeader';
import { useRouter } from 'next/router';
import { PostList } from 'src/components/post/list/PostList';
import { PostSearchInput } from './PostSearchInput';
import { Button } from 'src/components/common/Button';
import { Pager } from 'src/components/post/list/Pager';
import axios from 'axios';
import { Loading } from 'src/components/common/Loading';

type FetchPostsInfo = {
  post_id: string;
  title: string;
  content: string;
};

export type PostLists = {
  postId: string;
  title: string;
  content: string;
};

export const PostListUI = () => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [postLists, setFetchLists] = useState<PostLists[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');

  const pagerLength = Math.ceil(postLists.length / 20);

  const SEARCH_POST_URL = 'http://localhost:3010/controller/post/search.php';
  const FETCH_POSTS_URL = 'http://localhost:3010/controller/post/list.php';

  const changeSearchInput = (e) => {
    setSearchInput(e.currentTarget.value);
  };

  const searchHandler = async () => {
    const params = new URLSearchParams();
    params.append('title', searchInput);

    try {
      const res = await axios.get(SEARCH_POST_URL, { params });
      if (res && !res.data.err_code) {
        const response: PostLists[] = res.data.map((o) => {
          return {
            postId: o.post_id,
            title: o.title,
            content: o.content,
          };
        });

        setFetchLists(response);
      } else {
        alert(res.data.message);
      }
    } catch (e) {
      alert(e);
    }
  };

  const fetchPostsInfo = async () => {
    const params = new URLSearchParams();
    try {
      const res = await axios.get(FETCH_POSTS_URL, { params });
      if (res && !res.data.err_code) {
        const response: FetchPostsInfo[] = res.data;
        const responseFormat: PostLists[] = response.map((o) => {
          return {
            postId: o.post_id,
            title: o.title,
            content: o.content,
          };
        });
        setFetchLists(responseFormat);
        setLoading(true);
      } else {
        alert(res.data.message);
      }
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    fetchPostsInfo();
  }, []);

  if (!loading) {
    return <Loading />;
  }

  return (
    <>
      <PagesHeader title="記事一覧" onClick={() => router.back()} />
      <PostSearchInput searchInput={searchInput} onChange={changeSearchInput} />
      <div className="w-1/6 mx-auto">
        <Button title="検索" onClick={searchHandler} disabled={false} />
      </div>
      <PostList postLists={postLists} pageNumber={pageNumber} />
      <Pager pagerLength={pagerLength} pageNumber={pageNumber} setPageNumber={setPageNumber} />
    </>
  );
};
