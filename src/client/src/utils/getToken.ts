export function getToken(): string | null {
  if (document.cookie != '') {
    const cookieInfo = document.cookie.split('; ');
    const cookieToken = cookieInfo.filter((o) => o.includes('user='))[0];

    if (cookieToken) {
      return cookieToken.replace('user=', '');
    }

    return null;
  }
}
