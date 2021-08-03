import React from 'react';
import { usePassword } from 'src/hooks/accounts/password';
import { PagesHeader } from 'src/components/header/PagesHeader';
import { InputForm } from './inputForm';

type PasswordUIProps = React.ComponentProps<typeof InputForm>;

export const PasswordUIContainer = () => {
  const { ...props } = usePassword();
  return <PasswordUI {...props} />;
};

export const PasswordUI: React.FC<PasswordUIProps> = ({ ...props }) => {
  return (
    <>
      <PagesHeader title="マイページ" />
      <InputForm {...props} />
    </>
  );
};
