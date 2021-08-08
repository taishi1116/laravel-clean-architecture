import React from 'react';
import { useRouter } from 'next/router';
import { RegisterForm } from 'src/components/accounts/register/RegisterForm';
import { PagesHeader } from 'src/components/header/PagesHeader';
import { useRegister } from 'src/hooks/accounts/register';

type RegisterFormProps = React.ComponentProps<typeof RegisterForm>;
type Props = RegisterFormProps & { routerBack: () => void };

export const RegisterUIContainer = () => {
  const router = useRouter();
  const routerBack = () => {
    router.back();
  };

  const {
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
  } = useRegister();

  return (
    <RegisterUI
      inputBase64RepresentativeImage={inputBase64RepresentativeImage}
      inputUserName={inputUserName}
      inputEmail={inputEmail}
      inputPassword={inputPassword}
      inputPasswordConfirmation={inputPasswordConfirmation}
      handleChangeBase64RepresentativeImage={handleChangeBase64RepresentativeImage}
      handleChangeUserName={handleChangeUserName}
      handleChangeEmail={handleChangeEmail}
      handleChangePassword={handleChangePassword}
      handleChangePasswordConfirmation={handleChangePasswordConfirmation}
      validator={validator}
      postRegisterInfo={postRegisterInfo}
      routerBack={routerBack}
    />
  );
};

export const RegisterUI: React.FC<Props> = ({
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
  routerBack,
}) => {
  return (
    <div>
      <PagesHeader title="会員登録" onClick={routerBack} />
      <RegisterForm
        inputBase64RepresentativeImage={inputBase64RepresentativeImage}
        inputUserName={inputUserName}
        inputEmail={inputEmail}
        inputPassword={inputPassword}
        inputPasswordConfirmation={inputPasswordConfirmation}
        handleChangeBase64RepresentativeImage={handleChangeBase64RepresentativeImage}
        handleChangeUserName={handleChangeUserName}
        handleChangeEmail={handleChangeEmail}
        handleChangePassword={handleChangePassword}
        handleChangePasswordConfirmation={handleChangePasswordConfirmation}
        validator={validator}
        postRegisterInfo={postRegisterInfo}
      />
    </div>
  );
};
