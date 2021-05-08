import React, { useEffect, useState } from 'react';
import { RegisterUI } from 'src/components/accounts/register';
import { useRouter } from 'next/router';
import { paths } from '../../utils/paths';
import { Loading } from '../../components/common/Loading';

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const token = window.location.href.split('url_token=')[1];

    if (!token) {
      router.push(paths.accounts.preRegister);
    } else {
      setLoading(true);
    }
  }, []);

  if (!loading) {
    return <Loading />;
  }
  return (
    <>
      <RegisterUI />
    </>
  );
};

export default Register;
