import { useRouter } from 'next/router';
import { paths } from 'src/utils/paths';

type Props = {
  articleId: string;
  postTitle: string;
  postContent: string;
};

export const ArticleItem = ({ articleId, postTitle, postContent }: Props) => {
  const router = useRouter();
  return (
    <div className={'wrapper mb-5'} onClick={() => router.push(`${paths.articles.default}/${articleId}`)}>
      <div className={'text-lg font-bold mb-3'}>{postTitle}</div>
      <div className={'truncate'}>{postContent}</div>
      <style jsx>
        {`
          .wrapper {
            box-shadow: 0px 2px 5px rgb(117 117 117 / 20%);
            border-radius: 12px;
          }
        `}
      </style>
    </div>
  );
};
