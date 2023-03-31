//NOTE: 토큰을 저장하는 함수
export const saveTokens = (token) => {
    localStorage.setItem("ACCESS_TOKEN", token.accessToken);
    localStorage.setItem("REFRESH_TOKEN", token.refreshToken);
  };
  
  //NOTE: 토큰을 가져오는 함수
  export const getTokens = () => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    const refreshToken = localStorage.getItem("REFRESH_TOKEN");
    return {
      accessToken,
      refreshToken,
    };
  };
  