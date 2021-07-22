import React from 'react';
import { PagesHeader } from 'src/components/header/PagesHeader';
import { LoginForm } from 'src/components/accounts/login/LoginForm';
import { useLogin } from 'src/hooks/accounts/login';

type Props = React.ComponentProps<typeof LoginForm>;
export const LoginUIContainer = () => {
  const {
    inputEmail,
    inputPassword,
    handleChangeEmail,
    handleChangePassword,
    handleClickLogin,
    validator,
  } = useLogin();

  return (
    <LoginUI
      inputEmail={inputEmail}
      inputPassword={inputPassword}
      handleChangeEmail={handleChangeEmail}
      handleChangePassword={handleChangePassword}
      handleClickLogin={handleClickLogin}
      validator={validator}
    />
  );
};

export const LoginUI: React.VFC<Props> = ({
  inputEmail,
  inputPassword,
  handleChangeEmail,
  handleChangePassword,
  handleClickLogin,
  validator,
}) => {
  return (
    <>
      <PagesHeader title="ログイン" />
      <LoginForm
        inputEmail={inputEmail}
        inputPassword={inputPassword}
        handleChangeEmail={handleChangeEmail}
        handleChangePassword={handleChangePassword}
        handleClickLogin={handleClickLogin}
        validator={validator}
      />
    </>
  );
};
