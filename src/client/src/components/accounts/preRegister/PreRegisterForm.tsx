import axios from 'axios';
import { useState } from 'react';
import { Button } from 'src/components/common/Button';
import { TextInput } from 'src/components/common/TextInput';

type Props = {
  setChangeDisplay: React.Dispatch<React.SetStateAction<'preRegisterForm' | 'preRegisterComp'>>;
};

export const PreRegisterForm = ({ setChangeDisplay }: Props) => {
  const [inputEmail, setInputEmail] = useState<string>('');

  const emailRegex = /[\w\d_-]+@[\w\d_-]+\.[\w\d._-]+/;
  const PRE_REGISTER_URL = 'http://localhost:3010/controller/accounts/pre_register.php';

  const canApply = {
    hasInputEmail: () => inputEmail.length > 0 && emailRegex.test(inputEmail),
    canRegister: () => {
      return canApply.hasInputEmail();
    },
  };

  const applyHandler = async () => {
    const params = new URLSearchParams();
    params.append('email', inputEmail);
    try {
      const res = await axios.post(PRE_REGISTER_URL, params);
      if (res && !res.data.err_code) {
        setChangeDisplay('preRegisterComp');
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputEmail(e.target.value);
          }}
        />

        <div className="pb-4">
          <Button title="登録する" onClick={applyHandler} disabled={false} />
        </div>
      </div>
    </>
  );
};
