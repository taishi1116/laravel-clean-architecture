import { useRouter } from 'next/router';
import { PagesHeader } from 'src/components/header/PagesHeader';
import { EditForm } from 'src/components/accounts/edit/EditForm';

export const EditUI = () => {
  const router = useRouter();
  return (
    <>
      <PagesHeader title="会員情報編集" onClick={() => router.back()} />
      <EditForm />
    </>
  );
};
