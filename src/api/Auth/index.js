import apiClient from "../apiClient";

// MEMO: body => {email , password}
export const login = (body) => {
    return apiClient.post("/auth/login", body);
  };
// MEMO: body =>  {email , password,name,nickname}
export const register = (body) => {
    return apiClient.post("/auth/register", body);
};


//* CMS- login, register
// MEMO: body => {email , password}
export const adminLogin = (body) => {
    return apiClient.post("/auth/login/admin", body);
  };
  
  // MEMO: body =>  {email , password,name,nickname}
export const adminRegister = (body) => {
    return apiClient.post("/auth/register/admin", body);
  };
  

  