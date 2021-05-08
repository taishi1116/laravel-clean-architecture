import { TextInput } from 'src/components/common/TextInput';
import { Button } from 'src/components/common/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../../../utils/getToken';

type fetchResponse = {
  name: string;
  password: string;
};

export const EditForm = () => {
  const [token, setToken] = useState('');
  const [userInfo, setUserInfo] = useState({ name: '', password: '', checkPassword: '' });

  const FETCH_URL = 'http://localhost:3010/controller/accounts/mypage.php';
  const UPDATE_URL = 'http://localhost:3010/controller/accounts/edit.php';

  const fetchUserInfo = async (token: string) => {
    const params = new URLSearchParams();
    params.append('email', token);
    try {
      const res = await axios.get(FETCH_URL, { params });
      if (res && !res.data.err_code) {
        const resData: fetchResponse = res.data;
        setUserInfo({
          ...userInfo,
          name: resData.name,
        });
      } else {
        alert(res.data.message);
      }
    } catch (e) {
      alert(e);
    }
  };

  const updateHandler = async () => {
    const params = new URLSearchParams();
    params.append('user_id', token);
    if (userInfo.name) {
      params.append('user_name', userInfo.name);
    }
    if (userInfo.password) {
      params.append('password', userInfo.password);
    }

    try {
      const res = await axios.post(UPDATE_URL, params);
      if (res && !res.data.err_code) {
        alert('情報の更新が完了しました！');
      } else {
        alert(res.data.message);
      }
    } catch (e) {
      alert(e);
    }
  };

  const validator = {
    isUsername: () => userInfo.name.length > 0,
    isPasswordCheck: () => userInfo.password === userInfo.checkPassword,
  };

  useEffect(() => {
    const fetchToken = getToken();
    setToken(fetchToken);
    fetchUserInfo(fetchToken);
  }, []);

  return (
    <>
      <div className="w-7/12 mx-auto">
        <TextInput
          inputTitle={'ニックネーム'}
          placeholder={'ニックネーム'}
          required={false}
          inputValue={userInfo.name}
          type={'text'}
          isDisabledValidate={validator.isUsername()}
          validationText={'ニックネームを入力してください'}
          onChange={(e) => {
            setUserInfo({
              ...userInfo,
              name: e.target.value,
            });
          }}
        />
        <TextInput
          inputTitle={'パスワード'}
          placeholder={'変更する場合入力'}
          required={false}
          inputValue={userInfo.password}
          type={'password'}
          isDisabledValidate={true}
          validationText={''}
          onChange={(e) => {
            setUserInfo({
              ...userInfo,
              password: e.target.value,
            });
          }}
        />
        <TextInput
          inputTitle={'パスワード(確認)'}
          placeholder={'パスワードをもう一度入力'}
          required={false}
          inputValue={userInfo.checkPassword}
          type={'password'}
          isDisabledValidate={validator.isPasswordCheck()}
          validationText={'パスワードが一致しません'}
          onChange={(e) => {
            setUserInfo({
              ...userInfo,
              checkPassword: e.target.value,
            });
          }}
        />

        <Button
          title={'情報を更新'}
          onClick={updateHandler}
          disabled={!validator.isUsername() || !validator.isPasswordCheck()}
        />
      </div>
    </>
  );
};
