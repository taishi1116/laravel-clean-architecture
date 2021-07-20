import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { paths } from 'src/utils/paths';
import { getToken } from 'src/utils/getToken';

export const TopHeader = () => {
  const router = useRouter();
  const [loginToken, setLoginToken] = useState('');

  const logoutHandler = async () => {
    try {
      window.document.cookie = 'user=; expires=0';
      router.reload();
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    setLoginToken(getToken());
  }, []);

  return (
    <>
      <div className="w-full text-white bg-blue-400 border box-border">
        <div className="lg:w-2/4 flex justify-between mx-auto h-12">
          <div className="my-auto	mx-0">タイトル名</div>
          <div className="lg:w-3/12 flex justify-between">
            {loginToken ? (
              <>
                <button
                  className="my-auto	lg:mx-0 mr-3"
                  onClick={() => {
                    router.push(`${paths.post.list}`);
                  }}
                >
                  記事一覧
                </button>
                <button className="my-auto	lg:mx-0 mr-3" onClick={logoutHandler}>
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
