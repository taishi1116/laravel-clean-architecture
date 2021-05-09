import { useRouter } from 'next/router';
import { PagesHeader } from 'src/components/header/PagesHeader';
import { UserInfo } from 'src/components/accounts/mypage/UserInfo';

export const MypageUI = () => {
  const router = useRouter();

  return (
    <>
      <PagesHeader title="マイページ" onClick={() => router.back()} />
      <UserInfo />
    </>
  );
};
