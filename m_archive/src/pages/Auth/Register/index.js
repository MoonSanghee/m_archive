import React, { useState } from "react";
import styles from "./register.module.scss";
import { Button, Input } from "../../../components";
import { useNavigate } from "react-router-dom";

const Register = () => {
  // const [form, setForm] = useState({
  //   name: "",
  //   nickname: "",
  //   email: "",
  //   password: "",
  // });
  const navigate = useNavigate();

  const [enteredName, setEnteredName] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [nameStatus, setNameStatus] = useState("null");

  const [enteredNickname, setEnteredNickname] = useState("");
  const [enteredNicknameTouched, setEnteredNicknameTouched] = useState(false);
  const [nicknameStatus, setNicknameStatus] = useState("null");

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);
  const [emailStatus, setEmailStatus] = useState("null");
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i; //제일 많이 보임

  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredPasswordTouched, setEnteredPasswordTouched] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState("");
  const passwordRegEx = /^[A-Za-z0-9]{8,16}$/; //대문자,소문자,숫자 8~16자리수

  const [enteredCheckpassword, setEnteredCheckpassword] = useState("");
  const [enteredCheckpasswordTouched, setEnteredCheckpasswordTouched] =
    useState(false);
  const [checkpasswordStatus, setCheckpasswordStatus] = useState("1");

  //form 유효 확인
  let formIsValid = false;

  if (
    nameStatus === "" &&
    nicknameStatus === "" &&
    emailStatus === "" &&
    passwordStatus === "" &&
    enteredPassword === enteredCheckpassword
  ) {
    formIsValid = true;
  }

  //name
  const nameInputChangeHandler = (event) => {
    setEnteredNameTouched(false);
    setEnteredName(event.target.value);
  };

  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
    isPassedName();
  };

  const isPassedName = () => {
    if (enteredName.trim() === "") {
      return setNameStatus("이름을 입력하세요.");
    } else {
      return setNameStatus("");
    }
  };

  //nickname
  const nicknameInputChangeHandler = (event) => {
    setEnteredNicknameTouched(false);
    setEnteredNickname(event.target.value);
  };

  const nicknameInputBlurHandler = (event) => {
    setEnteredNicknameTouched(true);
    isPassedNickname();
  };

  const isPassedNickname = () => {
    if (enteredNickname.trim() === "") {
      return setNicknameStatus("사용할 닉네임을 입력하세요.");
    } else {
      return setNicknameStatus("");
    }
  };

  //email
  const emailInputChangeHandler = (event) => {
    setEnteredEmailTouched(false);
    setEnteredEmail(event.target.value);
  };

  const emailInputBlurHandler = (event) => {
    setEnteredEmailTouched(true);
    isPassedEmail();
  };

  const isPassedEmail = () => {
    if (enteredEmail === "") {
      return setEmailStatus("입력하세요.");
    } else if (emailRegEx.test(enteredEmail)) {
      return setEmailStatus("");
    } else {
      return setEmailStatus("정확한 이메일 주소를 입력하세요.");
    }
  };

  //password
  const passwordInputChangeHandler = (event) => {
    setEnteredPasswordTouched(false);
    setEnteredPassword(event.target.value);
  };

  const passwordInputBlurHandler = (event) => {
    setEnteredPasswordTouched(true);
    isPassedPassword();
  };

  const isPassedPassword = () => {
    if (enteredPassword === "") {
      //입력 0
      return setPasswordStatus("입력하세요.");
    } else if (enteredPassword.match(passwordRegEx) === null) {
      //땡
      return setPasswordStatus("비밀번호는 8~16자 이내로 입력해주세요.");
    } else {
      //성공
      return setPasswordStatus("");
    }
  };

  //check password
  const checkpasswordInputChangeHandler = (event) => {
    setEnteredCheckpasswordTouched(false);
    setEnteredCheckpassword(event.target.value);
  };

  const checkpasswordInputBlurHandler = (event) => {
    setEnteredCheckpasswordTouched(true);
    isPassedcheckPassword();
  };

  const isPassedcheckPassword = () => {
    if (enteredCheckpassword === enteredPassword) {
      return setCheckpasswordStatus("");
    } else {
      //땡
      return setCheckpasswordStatus("입력하신 비밀번호가 일치하지 않습니다.");
    }
  };
  const onClickedLogin = () => {
    navigate("/login");
  };

  //회원가입버튼
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(`이름: ${enteredName}`); //확인용
    console.log(`닉네임: ${enteredNickname}`);
    console.log(`이메일: ${enteredEmail}`);
    console.log(`비번: ${enteredPassword}`);
    console.log(formIsValid);
    if (formIsValid !== true) {
      return;
    }
    //navigate('/'); 장르선택화면으로 넘어갈 예정
    
    // setForm({
    //   ...form,
    //   name: enteredName,
    //   nickname: enteredNickname,
    //   email: enteredEmail,
    //   password: enteredPassword,
    // });
  };

  return (
    <main className={styles.wrapper}>
      <section>
        <div className={styles.overlayContainer}>
          <h1>
            WELCOME,
            <br />
            어서오세요!
          </h1>
          <p>
            서비스를 이용하시려면
            <br />
            로그인해주세요
          </p>
          <Button
            width={"big"}
            border={"borderwhite"}
            type="submit"
            form="loginForm"
            onClick={onClickedLogin}
          >
            로그인
          </Button>
        </div>
        <div className={styles.formContainer}>
          <h1>M-archive</h1>
          <form id="loginForm" className={styles.loginForm} onSubmit={onSubmit}>
            <Input
              placeholder="사용자의 이름을 입력해주세요"
              className={styles.inputWrapper}
              name="name"
              autoComplete="off"
              onChange={nameInputChangeHandler}
              onBlur={nameInputBlurHandler}
              value={enteredName}
              errorText={enteredNameTouched && nameStatus}
            />
            <Input
              placeholder="닉네임을 입력해주세요"
              className={styles.inputWrapper}
              name="nickname"
              autoComplete="off"
              onChange={nicknameInputChangeHandler}
              onBlur={nicknameInputBlurHandler}
              value={enteredNickname}
              errorText={enteredNicknameTouched && nicknameStatus}
            />
            <Input
              placeholder="이메일주소를 입력해주세요"
              className={styles.inputWrapper}
              name="email"
              autoComplete="off"
              onChange={emailInputChangeHandler}
              onBlur={emailInputBlurHandler}
              value={enteredEmail}
              errorText={enteredEmailTouched && emailStatus}
            />
            <Input
              className={styles.inputWrapper}
              placeholder="비밀번호"
              name="password"
              autoComplete="off"
              onChange={passwordInputChangeHandler}
              onBlur={passwordInputBlurHandler}
              value={enteredPassword}
              errorText={enteredPasswordTouched && passwordStatus}
            />
            <Input
              className={styles.inputWrapper}
              placeholder="비밀번호 재확인"
              name="checkpassword"
              autoComplete="off"
              onChange={checkpasswordInputChangeHandler}
              onBlur={checkpasswordInputBlurHandler}
              value={enteredCheckpassword}
              errorText={enteredCheckpasswordTouched && checkpasswordStatus}
            />
          </form>
          <Button width={"big"} type="submit" form="loginForm">
            회원가입
          </Button>
          {/* {formIsValid ? "(확인용-성공)" : "(확인용-실패)"} */}
        </div>
      </section>
    </main>
  );
};  

export default Register;
