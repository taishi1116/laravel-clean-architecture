import React from 'react';
import { Button } from 'src/components/common/Button';
import { TextInput } from 'src/components/common/TextInput';
import { PasswordHooks } from 'src/hooks/accounts/password';

type Props = PasswordHooks;

export const InputForm: React.FC<Props> = ({
  oldPassword,
  newPassword,
  validator,
  handleChangeOldPassword,
  handleChangeNewPassword,
  postNewPassword,
}) => {
  return (
    <div className="w-7/12 mx-auto">
      <TextInput
        inputTitle="現在のパスワード"
        placeholder="半角英数字8文字以上"
        inputValue={oldPassword || ''}
        type="password"
        required={true}
        onChange={handleChangeOldPassword}
        isDisabledValidate={validator.isValidOldPassword()}
        validationText="半角英数字8文字以上で入力してください"
      />
      <TextInput
        inputTitle="新規パスワード"
        placeholder="半角英数字8文字以上"
        inputValue={newPassword || ''}
        type="password"
        required={true}
        onChange={handleChangeNewPassword}
        isDisabledValidate={validator.isValidNewPassword()}
        validationText="半角英数字8文字以上で入力してください"
      />

      <div className="pb-4">
        <Button title="変更する" onClick={postNewPassword} disabled={!validator.canPostNewPassword()} />
      </div>
    </div>
  );
};
