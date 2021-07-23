import { Loading } from 'src/components/common/Loading';
import { PostListUI } from 'src/components/post/list/';
import { useArticleList } from 'src/hooks/articles/list';
import { useEffect } from 'react';

const PostList = () => {
  const { loading, articlesInfo, fetchArticlesInfo, handleClickPreOrNextArticle } = useArticleList();

  useEffect(() => {
    fetchArticlesInfo();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <PostListUI articlesInfo={articlesInfo} handleClickPreOrNextArticle={handleClickPreOrNextArticle} />
    </>
  );
};

export default PostList;
