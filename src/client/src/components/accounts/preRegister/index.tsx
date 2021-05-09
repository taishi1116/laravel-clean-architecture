import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { PreRegisterForm } from 'src/components/accounts/preRegister/PreRegisterForm';
import { PreRegisterComp } from 'src/components/accounts/preRegister/PreRegisterComp';
import { PagesHeader } from 'src/components/header/PagesHeader';

export const PreRegisterUI = () => {
  const router = useRouter();
  const [changeDisplay, setChangeDisplay] = useState<'preRegisterForm' | 'preRegisterComp'>('preRegisterForm');

  return (
    <div>
      <PagesHeader title="会員登録" onClick={() => router.back()} />

      {changeDisplay == 'preRegisterForm' ? <PreRegisterForm setChangeDisplay={setChangeDisplay} /> : null}
      {changeDisplay == 'preRegisterComp' ? <PreRegisterComp setChangeDisplay={setChangeDisplay} /> : null}
    </div>
  );
};
