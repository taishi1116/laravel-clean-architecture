import React from 'react';
import { useRouter } from 'next/router';

import { ArticleList } from 'src/components/articles/list/ArticleList';
import { Pager } from 'src/components/articles/list/Pager';
import { PagesHeader } from 'src/components/header/PagesHeader';

type PostListProps = React.ComponentProps<typeof ArticleList>;
type PagerProps = Omit<React.ComponentProps<typeof Pager>, 'currentPage' | 'lastPage'>;

type Props = PostListProps & PagerProps;

export const PostListUI: React.FC<Props> = ({ articlesInfo, handleClickPreOrNextArticle }) => {
  const router = useRouter();

  return (
    <>
      <PagesHeader title="記事一覧" onClick={() => router.back()} />

      {/* <PostSearchInput searchInput={searchInput} onChange={changeSearchInput} /> */}
      {/* <div className="w-1/6 mx-auto">
        <Button title="検索" onClick={searchHandler} disabled={false} />
      </div> */}

      <ArticleList articlesInfo={articlesInfo} />

      <Pager
        currentPage={articlesInfo.currentPage}
        lastPage={articlesInfo.lastPage}
        handleClickPreOrNextArticle={handleClickPreOrNextArticle}
      />
    </>
  );
};
