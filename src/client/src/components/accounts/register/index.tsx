import React from 'react';
import { useRouter } from 'next/router';
import { RegisterForm } from 'src/components/accounts/register/RegisterForm';
import { PagesHeader } from 'src/components/header/PagesHeader';

export const RegisterUI = () => {
  const router = useRouter();
  return (
    <div>
      <PagesHeader title="会員登録" onClick={() => router.back()} />
      <RegisterForm />
    </div>
  );
};
