//NOTE: 토큰을 저장하는 함수
export const saveTokens = (token) => {
    localStorage.setItem("accessToken", token.accessToken);
    localStorage.setItem("refreshToken", token.refreshToken);
  };
  
  //NOTE: 토큰을 가져오는 함수
  export const getTokens = () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    return {
      accessToken,
      refreshToken,
    };
  };
  