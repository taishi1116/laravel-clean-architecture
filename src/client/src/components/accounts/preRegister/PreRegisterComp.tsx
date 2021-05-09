import { Button } from 'src/components/common/Button';

type Props = {
  setChangeDisplay: React.Dispatch<React.SetStateAction<'preRegisterForm' | 'preRegisterComp'>>;
};

export const PreRegisterComp = ({ setChangeDisplay }: Props) => {
  const reSendEmailHandler = () => {
    setChangeDisplay('preRegisterForm');
  };
  return (
    <div className="text-center mx-5">
      <div className="mx-auto my-8 text-lg font-bold">仮登録が完了しました</div>

      <div className="mb-7">
        登録いただいたメールアドレスに <br /> 本登録用のメールを送信しました。 <br />
        <span className="font-bold">24時間</span>以内にメールに記載されたURLからご登録ください。
      </div>

      <div className="w-6/12 mx-auto">
        <Button title="メールを再送する" onClick={reSendEmailHandler} disabled={false} />
      </div>
    </div>
  );
};
