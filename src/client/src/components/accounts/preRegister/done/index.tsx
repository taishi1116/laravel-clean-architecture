import React from 'react';
import { useRouter } from 'next/router';
import { Button } from 'src/components/common/Button';
import { paths } from 'src/utils/paths';

type Props = {
  handleClickResendMail: () => void;
};

export const PreRegisterDoneContainer = () => {
  const router = useRouter();
  const handleClickResendMail = () => {
    router.push(paths.accounts.preRegister.index);
  };
  return <PreRegisterDone handleClickResendMail={handleClickResendMail} />;
};
const PreRegisterDone: React.FC<Props> = ({ handleClickResendMail }) => {
  return (
    <div className="text-center mx-5">
      <div className="mx-auto my-8 text-lg font-bold">仮登録が完了しました</div>

      <div className="mb-7">
        登録いただいたメールアドレスに <br /> 本登録用のメールを送信しました。 <br />
        <span className="font-bold">24時間</span>以内にメールに記載されたURLからご登録ください。
      </div>

      <div className="w-6/12 mx-auto">
        <Button title="メールを再送する" onClick={handleClickResendMail} disabled={false} />
      </div>
    </div>
  );
};
