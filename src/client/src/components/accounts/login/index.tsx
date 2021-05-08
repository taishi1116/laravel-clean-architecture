import React from 'react';
import { useRouter } from 'next/router';
import { PagesHeader } from 'src/components/header/PagesHeader';
import { LoginForm } from 'src/components/accounts/login/LoginForm';

export const LoginUI = () => {
  const router = useRouter();

  return (
    <>
      <PagesHeader title="ログイン" onClick={() => router.back()} />
      <LoginForm />
    </>
  );
};
