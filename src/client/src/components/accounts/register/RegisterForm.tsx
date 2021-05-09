import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button } from 'src/components/common/Button';
import { TextInput } from 'src/components/common/TextInput';
import { paths } from 'src/utils/paths';

export const RegisterForm = () => {
  const router = useRouter();

  const [inputUserName, setInputUserName] = useState<string>('');
  const [inputEmail, setInputEmail] = useState<string>('');
  const [inputPassword, setInputPassword] = useState<string>('');
  const [inputCheckPassword, setInputCheckPassword] = useState<string>('');

  const emailRegex = /[\w\d_-]+@[\w\d_-]+\.[\w\d._-]+/;
  const REGISTER_URL = 'http://localhost:3010/controller/accounts/register.php';

  const canApply = {
    hasInputUserName: () => inputUserName.length > 0,
    hasInputEmail: () => inputEmail.length > 0 && emailRegex.test(inputEmail),
    hasInputPassword: () => inputPassword.length > 7,
    isMatchPassword: () => inputPassword === inputCheckPassword,
    canRegister: () => {
      return (
        canApply.hasInputUserName() &&
        canApply.hasInputEmail() &&
        canApply.hasInputPassword() &&
        canApply.isMatchPassword()
      );
    },
  };

  const applyHandler = async () => {
    const params = new URLSearchParams();
    params.append('name', inputUserName);
    params.append('email', inputEmail);
    params.append('password', inputPassword);
    try {
      const res = await axios.post(REGISTER_URL, params);
      if (res && !res.data.err_code) {
        router.push(paths.accounts.login);
      } else {
        alert(res.data.message);
      }
    } catch (e) {
      // TODO 仮実装のためエラー処理を考える
      alert(e);
    }
  };
  return (
    <>
      <div className="w-7/12 mx-auto bg-white">
        <TextInput
          inputTitle="ユーザネーム"
          placeholder="アルケミ"
          inputValue={inputUserName}
          required={true}
          isDisabledValidate={canApply.hasInputUserName()}
          validationText="ユーザーネームを入力してください"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputUserName(e.target.value);
          }}
        />
        <TextInput
          inputTitle="メールアドレス"
          placeholder="xxx@gmail.com"
          inputValue={inputEmail}
          required={true}
          isDisabledValidate={canApply.hasInputEmail()}
          validationText="メールアドレスを入力してください"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputEmail(e.target.value);
          }}
        />
        <TextInput
          inputTitle="パスワード"
          placeholder="8文字以上の半角英数字"
          inputValue={inputPassword}
          type="password"
          required={true}
          isDisabledValidate={canApply.hasInputPassword()}
          validationText="半角英数字8文字以上で入力してください"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputPassword(e.target.value);
          }}
        />
        <TextInput
          inputTitle="パスワード(確認)"
          placeholder="8文字以上の半角英数字"
          inputValue={inputCheckPassword}
          type="password"
          required={true}
          isDisabledValidate={canApply.isMatchPassword()}
          validationText="パスワードが一致しません。再度入力してください"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputCheckPassword(e.target.value);
          }}
        />

        <div className="pb-4">
          <Button title="登録する" onClick={applyHandler} disabled={canApply.canRegister() == false} />
        </div>
      </div>
    </>
  );
};
