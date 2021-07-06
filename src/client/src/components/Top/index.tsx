import { Button } from 'src/components/common/Button';
import { useRouter } from 'next/router';
import { paths } from 'src/utils/paths';
import { useEffect, useState } from 'react';
import { getToken } from '../../utils/getToken';
import { BASE_URL } from '../../utils/constants';
import axios from 'axios';
import { useSnackbar } from 'notistack';

type MonthAggregate = {
  users: number;
  articles: number;
};

export const TopUI = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [monthAggregate, setMonthAggregate] = useState<MonthAggregate>({ users: 0, articles: 0 });
  const [token, setToken] = useState<string | null>();

  const END_POINT = `${BASE_URL}/month_aggregate`;

  const fetchCounts = async () => {
    try {
      const res = await axios.get(END_POINT);
      setMonthAggregate(res.data);
    } catch (e) {
      enqueueSnackbar('月次集計の取得エラー', { variant: 'error' });
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
          <p>Next.js * Laravelによるブログサービス</p>
        </div>

        <div className="pt-4 mb-4 text-center">
          <div>月次登録ユーザー:{monthAggregate.users}</div>
          <div>月次投稿数：{monthAggregate.articles}</div>
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
