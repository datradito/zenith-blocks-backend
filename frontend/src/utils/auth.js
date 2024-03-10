export const decodeToken = (token) => {
  if (!token) {
    return;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
};


export const isTokenExpired = (token) => {
  // const token = decodeToken(token);
  if (!token || !token?.exp) {
    return true;
  }
  const currentTime = Math.floor(Date.now() / 1000);
  return token.exp < currentTime;
};
