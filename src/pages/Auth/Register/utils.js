export const validateForm = () => {};
// export const validateForm = () => {};
//NOTE: utils.js 혹은 constants.js

import { emailRegEx, passwordRegEx } from '../../../utils/regex';

//메시지 지정
export const validateName = (name) => {
  if (name === '') {
    return '입력하세요.';
  }
  return false;
};

export const validateNickname = (nickname) => {
  if (nickname === '') {
    return '입력하세요.';
  }
  return false;
};

export const validateEmail = (email) => {
  if (email === '') {
    return '입력하세요.';
  }

  if (!emailRegEx.test(email)) {
    return '정확한 이메일 주소를 입력하세요.';
  }

  return false;
};

export const validatePassword = (password) => {
  if (password === '') {
    return '입력하세요.';
  }

  if (password.match(passwordRegEx) === null) {
    return '숫자, 영문자, 특수문자(!@#$%^&*())를 포함해야 합니다.';
  }

  return false;
};

export const validateCheckpassword = (checkpassword, password) => {
  if (checkpassword === '') {
    return '입력하세요.';
  }

  if (checkpassword === password) {
    return false;
  }

  return '비밀번호가 일치하지 않습니다.';
};
