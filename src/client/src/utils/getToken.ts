export const getToken = () => {
  const cookies = document.cookie;
  const cookiesArray = cookies.split(';');
  const SESSION_KEY = 'laravel_session';

  for (const c of cookiesArray) {
    const cArray = c.split('=');
    if (cArray[0] == SESSION_KEY) {
      return cArray[0];
    }
    return null;
  }
};
