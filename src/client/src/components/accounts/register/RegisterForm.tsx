import React from 'react';
import { Button } from 'src/components/common/Button';
import { ImageInput } from 'src/components/common/ImageInput';
import { TextInput } from 'src/components/common/TextInput';
import { Validator } from 'src/hooks/accounts/register';

type Props = {
  inputBase64RepresentativeImage: string | ArrayBuffer;
  inputUserName: string;
  inputEmail: string;
  inputPassword: string;
  inputPasswordConfirmation: string;
  handleChangeBase64RepresentativeImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeUserName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangePasswordConfirmation: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validator: Validator;
  postRegisterInfo: () => Promise<void>;
};

export const RegisterForm: React.FC<Props> = ({
  inputBase64RepresentativeImage,
  inputUserName,
  inputEmail,
  inputPassword,
  inputPasswordConfirmation,
  handleChangeBase64RepresentativeImage,
  handleChangeUserName,
  handleChangeEmail,
  handleChangePassword,
  handleChangePasswordConfirmation,
  validator,
  postRegisterInfo,
}) => {
  return (
    <>
      <div className="w-7/12 mx-auto bg-white">
        <ImageInput value={inputBase64RepresentativeImage} onchange={handleChangeBase64RepresentativeImage} />

        <TextInput
          inputTitle="ユーザネーム"
          placeholder="アルケミ"
          inputValue={inputUserName || ''}
          required={true}
          isDisabledValidate={validator.hasInputUserName()}
          validationText="ユーザーネームを入力してください"
          onChange={handleChangeUserName}
        />
        <TextInput
          inputTitle="メールアドレス"
          placeholder="xxx@gmail.com"
          inputValue={inputEmail || ''}
          required={true}
          isDisabledValidate={validator.hasInputEmail()}
          validationText="メールアドレスを入力してください"
          onChange={handleChangeEmail}
        />
        <TextInput
          inputTitle="パスワード"
          placeholder="8文字以上の半角英数字"
          inputValue={inputPassword || ''}
          type="password"
          required={true}
          isDisabledValidate={validator.hasInputPassword()}
          validationText="半角英数字8文字以上で入力してください"
          onChange={handleChangePassword}
        />
        <TextInput
          inputTitle="パスワード(確認)"
          placeholder="8文字以上の半角英数字"
          inputValue={inputPasswordConfirmation || ''}
          type="password"
          required={true}
          isDisabledValidate={validator.isMatchPassword()}
          validationText="パスワードが一致しません。再度入力してください"
          onChange={handleChangePasswordConfirmation}
        />

        <div className="pb-4">
          <Button title="登録する" onClick={postRegisterInfo} disabled={!validator.canRegister()} />
        </div>
      </div>
    </>
  );
};
