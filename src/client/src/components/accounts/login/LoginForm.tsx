import React from 'react';
import { Button } from 'src/components/common/Button';
import { TextInput } from 'src/components/common/TextInput';
import { Validator } from 'src/hooks/accounts/login';

type Props = {
  inputEmail: string;
  inputPassword: string;
  handleChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickLogin: () => Promise<void>;
  validator: Validator;
};

export const LoginForm: React.VFC<Props> = ({
  inputEmail,
  inputPassword,
  handleChangeEmail,
  handleChangePassword,
  handleClickLogin,
  validator,
}) => {
  return (
    <>
      <div className="w-7/12 mx-auto">
        <TextInput
          inputTitle="メールアドレス"
          placeholder="xxx@gmail.com"
          inputValue={inputEmail || ''}
          required={true}
          onChange={handleChangeEmail}
          isDisabledValidate={validator.isValidInputEmail()}
          validationText="正しい形式のメールアドレスを入力してください"
        />
        <TextInput
          inputTitle="パスワード"
          placeholder="半角英数字8文字以上"
          inputValue={inputPassword || ''}
          type="password"
          required={true}
          onChange={handleChangePassword}
          isDisabledValidate={validator.isValidInputPassword()}
          validationText="半角英数字8文字以上で入力してください"
        />

        <div className="pb-4">
          <Button title="ログイン" onClick={handleClickLogin} disabled={!validator.isValidLogin()} />
        </div>
      </div>
    </>
  );
};
