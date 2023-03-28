//NOTE: utils.js 혹은 constants.js

import { emailRegEx } from "../../../utils/regex";

export const validateEmail = (email) => {
  if (email === "") {
    return "입력하세요.";
  }

  if (!emailRegEx.test(email)) {
    return "정확한 이메일 주소를 입력하세요.";
  }

  return true;
};
