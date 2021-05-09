import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Button } from 'src/components/common/Button';
import { TextInput } from 'src/components/common/TextInput';
import { paths } from 'src/utils/paths';

export const LoginForm = () => {
  const router = useRouter();
  const [inputEmail, setInputEmail] = useState<string>('');
  const [inputPassword, setInputPassword] = useState<string>('');

  const LOGIN_URL = 'http://localhost:3010/controller/accounts/login.php';

  const validationCheck = {
    checkEmail: () => inputEmail.length > 0,
    checkPassword: () => inputPassword.length > 0,
    canRegister: () => {
      return validationCheck.checkEmail() && validationCheck.checkPassword();
    },
  };

  const loginHandler = async () => {
    const params = new URLSearchParams();
    params.append('email', inputEmail);
    params.append('password', inputEmail);

    try {
      const res = await axios.post(LOGIN_URL, params);
      if (res && !res.data.err_code) {
        window.document.cookie = `user=${res.data}`;
        router.push(`${paths.top}`);
      } else {
        alert(res.data.message);
      }
    } catch (e) {
      alert(e);
    }
  };
  return (
    <>
      <div className="w-7/12 mx-auto">
        <TextInput
          inputTitle="メールアドレス"
          placeholder="xxx@gmail.com"
          inputValue={inputEmail}
          required={true}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputEmail(e.target.value);
          }}
        />
        <TextInput
          inputTitle="パスワード"
          placeholder="半角英数字8文字以上"
          inputValue={inputPassword}
          type="password"
          required={true}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputPassword(e.target.value);
          }}
        />

        <div className="pb-4">
          <Button title="ログイン" onClick={loginHandler} disabled={!validationCheck.canRegister() ? true : false} />
        </div>
      </div>
    </>
  );
};
