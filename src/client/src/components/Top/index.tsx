import { Button } from 'src/components/common/Button';
import { useRouter } from 'next/router';
import { paths } from 'src/utils/paths';
import { httpClient } from 'src/utils/httpClient';
import { BASE_URL } from 'src/utils/constants';
import { useEffect } from 'react';

export const TopUI = () => {
  const router = useRouter();

  //  TODO ログイン後のユーザーが取得できないs
  const fetchLoginUser = async () => {
    const res = await httpClient.get(BASE_URL + '/user');
    console.log(res);
  };

  useEffect(() => {
    fetchLoginUser();
  }, []);

  return (
    <>
      <div className="w-10/12 mx-auto lg:w-2/4">
        <div className="pt-4 mb-4 text-center">
          <p>Next.js * Laravelによるブログサービス</p>
        </div>

        <div className="mb-4">
          <Button
            title="投稿一覧を見る"
            onClick={() => {
              router.push(paths.articles.list);
            }}
            disabled={false}
          />
          {/* <Button
            title="新規投稿する"
            onClick={() => {
              token ? router.push(paths.articles.add) : router.push(paths.accounts.login);
            }}
            disabled={false}
          />
          <Button
            title="マイページ"
            onClick={() => {
              token ? router.push(paths.accounts.mypage) : router.push(paths.accounts.login);
            }}
            disabled={false}
          /> */}
        </div>
      </div>
      <style jsx>{``}</style>
    </>
  );
};
