//NOTE: utils.js 혹은 constants.js

import { emailRegEx, passwordRegEx } from '../../../utils/regex';

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
    return '올바른 비밀번호를 입력하세요.';
  }

  return false;
};
