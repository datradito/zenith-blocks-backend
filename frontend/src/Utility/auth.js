export const decodeToken = (token) => {
  if (!token) {
    return;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}

export const clearAuthData = () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('address');
    sessionStorage.removeItem('daoId');
};


export const setAuthData = (address, authToken, daoId) => {
  sessionStorage.setItem('authToken', authToken);
    sessionStorage.setItem('address', address);
    sessionStorage.setItem('daoId', daoId);
};

export const isTokenExpired = (decodedToken) => {
  if (!decodedToken || !decodedToken?.exp) {
      return true; 
    }
    const currentTime = Math.floor(Date.now() / 1000);
    // console.log("currentTime", currentTime)
    // console.log("decodedToken.exp", decodedToken.exp)
    return decodedToken.exp < currentTime;
  };