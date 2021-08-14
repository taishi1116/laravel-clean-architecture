import React from 'react';
import { TextInput } from 'src/components/common/TextInput';
import { ImageInput } from 'src/components/common/ImageInput';
import { Button } from 'src/components/common/Button';
import { Validator } from 'src/hooks/accounts/mypage/index';

type Props = {
  base64RepresentativeImage: string | ArrayBuffer;
  userName: string;
  email: string;
  validator: Validator;
  handleChangeBase64RepresentativeImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeUserName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updateUserInfo: () => Promise<void>;
};

export const UserInfo: React.FC<Props> = ({
  base64RepresentativeImage,
  userName,
  email,
  validator,
  handleChangeBase64RepresentativeImage,
  handleChangeUserName,
  handleChangeEmail,
  updateUserInfo,
}) => {
  return (
    <>
      <div className="w-7/12 mx-auto">
        <ImageInput value={base64RepresentativeImage} onchange={handleChangeBase64RepresentativeImage} />
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
