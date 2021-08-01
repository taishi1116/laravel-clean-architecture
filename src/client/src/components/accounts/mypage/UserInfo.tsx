import React from 'react';
import { TextInput } from 'src/components/common/TextInput';
import { Button } from 'src/components/common/Button';
import { Validator } from 'src/hooks/accounts/mypage/index';

type Props = {
  userName: string;
  email: string;
  validator: Validator;
  handleChangeUserName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updateUserInfo: () => Promise<void>;
};

export const UserInfo: React.FC<Props> = ({
  userName,
  email,
  validator,
  handleChangeUserName,
  handleChangeEmail,
  updateUserInfo,
}) => {
  return (
    <>
      <div className="w-7/12 mx-auto">
        <TextInput
          inputTitle={'ニックネーム'}
          placeholder={'ニックネームを入力'}
          required={true}
          inputValue={userName}
          type={'text'}
          isDisabledValidate={validator.isValidUserName()}
          validationText={'ニックネームを入力してください'}
          onChange={handleChangeUserName}
        />
        <TextInput
          inputTitle={'メールアドレス'}
          placeholder={'メールアドレスを入力'}
          required={true}
          inputValue={email}
          type={'text'}
          isDisabledValidate={validator.isValidEmail()}
          validationText={'不正なメールアドレスです'}
          onChange={handleChangeEmail}
        />

        <Button title={'更新'} onClick={updateUserInfo} disabled={!validator.canUserInfoUpdate()} />
      </div>
    </>
  );
};
