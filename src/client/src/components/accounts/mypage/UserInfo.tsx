import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { InfoItem } from 'src/components/accounts/mypage/InfoItem';
import { Button } from 'src/components/common/Button';
import { getToken } from '../../../utils/getToken';
import { useRouter } from 'next/router';
import { paths } from 'src/utils/paths';

type fetchResponse = {
  name: string;
  email: string;
};

export const UserInfo = () => {
  const router = useRouter();
  const FETCH_URL = 'http://localhost:3010/controller/accounts/mypage.php';
  const [userInfo, setUserInfo] = useState<fetchResponse>({ name: '', email: '' });
  const fetchUserInfo = async (token: string) => {
    const params = new URLSearchParams();
    params.append('email', token);
    try {
      const res = await axios.get(FETCH_URL, { params });
      if (res && !res.data.err_code) {
        const resData: fetchResponse = res.data;
        setUserInfo({
          name: resData.name,
          email: resData.email,
        });
      } else {
        alert(res.data.message);
      }
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    const fetchToken = getToken();
    fetchUserInfo(fetchToken);
  }, []);

  return (
    <>
      <div className="w-7/12 mx-auto">
        <InfoItem title="ユーザー名" value={userInfo.name} />
        <InfoItem title="メールアドレス" value={userInfo.email} />
        <Button title="ユーザー情報を更新する" onClick={() => router.push(paths.accounts.edit)} disabled={false} />
      </div>
      <style jsx>{``}</style>
    </>
  );
};
