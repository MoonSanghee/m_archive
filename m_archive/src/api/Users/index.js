import apiClient from '../apiClient';

//Admin - CMS 로그인
//MEMO: 유저리스트 가져오기
export const getUsers = (page, limit, name) => {
  return apiClient.get('/users',{
    params:{
      page,
      limit,
      name 
    }
  });
};

//MEMO: 유저 한 명 (상세)
export const getUser = (id) => {
  return apiClient.get(`/users/${id}/detail`);
};

export const getMe = () => {
  return apiClient.get('/users/me');
};

//유저
// export const modifyUser = (id, body) => {
//   return apiClient.patch(`/users/${id}`, body);
// };

export const modifyUser = (body) => {
  return apiClient.patch(`/users`, body);
};

export const countUsers = () => {
  return apiClient.get(`users/count`)
}

//userDelete
export const deleteUserAdmin = (id) => {
  return apiClient.delete(`/users/${id}/admin`);
};