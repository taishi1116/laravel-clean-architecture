import React from 'react';
import { Button } from 'src/components/common/Button';
import { TextInput } from 'src/components/common/TextInput';

type Props = {
  inputEmail: string;
  canApply: {
    hasInputEmail: () => boolean;
    canRegister: () => boolean;
  };
  changeStateEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  postInputEmail: () => Promise<void>;
};

export const PreRegisterForm: React.FC<Props> = ({ inputEmail, canApply, changeStateEmail, postInputEmail }) => {
  return (
    <>
      <div className="w-7/12 mx-auto bg-white">
        <div className="text-center mt-10 mb-4">
          <p>仮会員登録のメールアドレスを入力してください</p>
        </div>
        <TextInput
          inputTitle="メールアドレス"
          placeholder="xxx@gmail.com"
          inputValue={inputEmail}
          required={true}
          isDisabledValidate={canApply.hasInputEmail()}
          validationText="メールアドレスを入力してください"
          onChange={changeStateEmail}
        />

        <div className="pb-4">
          <Button title="登録する" onClick={postInputEmail} disabled={false} />
        </div>
      </div>
    </>
  );
};
