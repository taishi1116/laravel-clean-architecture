import React from 'react';
import { PagesHeader } from 'src/components/header/PagesHeader';
import { UserInfo } from 'src/components/accounts/mypage/UserInfo';
import { useMypage } from 'src/hooks/accounts/mypage';
import { Loading } from 'src/components/common/Loading';

type UserInfoProps = React.ComponentProps<typeof UserInfo>;

type Props = UserInfoProps & { loading: boolean };

export const MypageContainer = () => {
  const {
    base64RepresentativeImage,
    userName,
    email,
    loading,
    validator,
    handleChangeBase64RepresentativeImage,
    handleChangeUserName,
    handleChangeEmail,
    updateUserInfo,
  } = useMypage();

  return (
    <MypageUI
      base64RepresentativeImage={base64RepresentativeImage}
      userName={userName}
      email={email}
      loading={loading}
      validator={validator}
      handleChangeBase64RepresentativeImage={handleChangeBase64RepresentativeImage}
      handleChangeUserName={handleChangeUserName}
      handleChangeEmail={handleChangeEmail}
      updateUserInfo={updateUserInfo}
    />
  );
};

export const MypageUI: React.FC<Props> = ({
  base64RepresentativeImage,
  userName,
  email,
  loading,
  validator,
  handleChangeBase64RepresentativeImage,
  handleChangeUserName,
  handleChangeEmail,
  updateUserInfo,
}) => {
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <PagesHeader title="マイページ" />
      <UserInfo
        base64RepresentativeImage={base64RepresentativeImage}
        userName={userName}
        email={email}
        validator={validator}
        handleChangeUserName={handleChangeUserName}
        handleChangeBase64RepresentativeImage={handleChangeBase64RepresentativeImage}
        handleChangeEmail={handleChangeEmail}
        updateUserInfo={updateUserInfo}
      />
    </>
  );
};
