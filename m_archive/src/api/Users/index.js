import apiClient from "../apiClient";

//Admin - CMS 로그인
//MEMO: 유저리스트 가져오기
export const getUsers = () => {
    return apiClient.get("/users");
  };
  
  //MEMO: 유저 한 명 (상세)
  export const getUser = (id) => {
    return apiClient.get(`/users/${id}/detail`);
  };