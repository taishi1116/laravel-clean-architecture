import React from 'react';
import { useRouter } from 'next/router';
import { PreRegisterForm } from 'src/components/accounts/preRegister/PreRegisterForm';
import { PagesHeader } from 'src/components/header/PagesHeader';
import { usePreRegisterer } from 'src/hooks/accounts/preRegister';

type PreRegisterFormProps = React.ComponentProps<typeof PreRegisterForm>;

type PreRegisterUIProps = PreRegisterFormProps & {
  routerBack: () => void;
};

export const PreRegisterContainer: React.FC = () => {
  const router = useRouter();

  const routerBack = () => {
    router.back();
  };

  const { inputEmail, canApply, changeStateEmail, postInputEmail } = usePreRegisterer();
  return (
    <PreRegisterUI
      inputEmail={inputEmail}
      canApply={canApply}
      changeStateEmail={changeStateEmail}
      postInputEmail={postInputEmail}
      routerBack={routerBack}
    />
  );
};

export const PreRegisterUI: React.FC<PreRegisterUIProps> = ({
  inputEmail,
  canApply,
  changeStateEmail,
  postInputEmail,
  routerBack,
}) => {
  return (
    <div>
      <PagesHeader title="会員登録" onClick={routerBack} />

      <PreRegisterForm
        inputEmail={inputEmail}
        canApply={canApply}
        changeStateEmail={changeStateEmail}
        postInputEmail={postInputEmail}
      />
    </div>
  );
};
