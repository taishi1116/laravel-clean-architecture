import { Button } from 'src/components/common/Button';
import { useRouter } from 'next/router';
import { paths } from 'src/utils/paths';
import { useEffect, useState } from 'react';
import { getToken } from '../../utils/getToken';
import axios from 'axios';

type countType = {
  month_aggregate: string;
  user_count: string;
  post_count: string;
};

export const TopUI = () => {
  const router = useRouter();
  const [counts, setCounts] = useState({ monthAggregate: '', user: '', post: '' });
  const [token, setToken] = useState<string | null>();

  const FETCH_MONTH_AGGREGATE_URL = 'http://localhost:3010/controller/month_aggregate.php';

  const fetchCounts = async () => {
    try {
      const res = await axios.get(FETCH_MONTH_AGGREGATE_URL);
      if (res && !res.data.err_code) {
        const resData: countType = res.data;
        setCounts({
          monthAggregate: resData.month_aggregate,
          user: resData.user_count,
          post: resData.post_count,
        });
      } else {
        alert(res.data.message);
      }
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    setToken(getToken());
    fetchCounts();
  }, []);

  return (
    <>
      <div className="w-10/12 mx-auto lg:w-2/4">
        <div className="pt-4 mb-4 text-center">
          <p>自己学習のための掲示板サイトです</p>
          <p>技術スタックは下記でできています！</p>
          <ul>
            <li>Front:Next.js</li>
            <li>Backend:PHP(今後Laravelになる予定)</li>
          </ul>
        </div>

        <div className="pt-4 mb-4 text-center">
          <div>{counts.monthAggregate}</div>
          <div>登録ユーザー:{counts.user}</div>
          <div>投稿数：{counts.post}</div>
        </div>

        <div className="mb-4">
          <Button
            title="投稿一覧を見る"
            onClick={() => {
              router.push(paths.post.list);
            }}
            disabled={false}
          />
          <Button
            title="新規投稿する"
            onClick={() => {
              token ? router.push(paths.post.add) : router.push(paths.accounts.login);
            }}
            disabled={false}
          />
          <Button
            title="マイページ"
            onClick={() => {
              token ? router.push(paths.accounts.mypage) : router.push(paths.accounts.login);
            }}
            disabled={false}
          />
        </div>
      </div>
      <style jsx>{``}</style>
    </>
  );
};
