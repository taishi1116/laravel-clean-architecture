import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { globalContext } from 'src/contexts/globalContext';
import { paths } from 'src/utils/paths';

export const TopHeader: React.FC = () => {
  const router = useRouter();
  const { token } = useContext(globalContext);

  return (
    <>
      <div className="w-full text-white bg-blue-400 border box-border">
        <div className="lg:w-2/4 flex justify-between mx-auto h-12">
          <div className="my-auto	mx-0">タイトル名</div>
          <div className="lg:w-3/12 flex justify-between">
            {token ? (
              <>
                <button
                  className="my-auto	lg:mx-0 mr-3"
                  onClick={() => {
                    router.push(`${paths.articles.list}`);
                  }}
                >
                  記事一覧
                </button>
                <button
                  className="my-auto	lg:mx-0 mr-3"
                  onClick={() => {
                    localStorage.removeItem('auth-token');
                    router.reload();
                  }}
                >
                  ログアウト
                </button>
              </>
            ) : (
              <>
                <button
                  className="my-auto	lg:mx-0 mr-3"
                  onClick={() => {
                    router.push(`${paths.accounts.preRegister.index}`);
                  }}
                >
                  会員登録
                </button>
                <button
                  className="my-auto mx-0"
                  onClick={() => {
                    router.push(`${paths.accounts.login}`);
                  }}
                >
                  ログイン
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <style jsx>{``}</style>
    </>
  );
};
