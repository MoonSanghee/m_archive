import React, { useState } from "react";
import styles from "./login.module.scss";
import { Button, Input } from "../../../components";

const LoginPage = () => {
  const [form, setForm] = useState({
    userEmail: "",
    password: "",
  });
  const { userEmail, password } = form;

  const [emailStatus, setEmailStatus] = useState("");
  const [passwordStatus, setPasswordStatus] = useState("");

  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    setForm({ ...form, [name]: value });
    console.log(e.currentTarget.value); //확인용
    isPassedEmail();
    isPassedPassword();
  };

  const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i; //제일 많이 보임
  const passwordRegEx = /^[A-Za-z0-9]{8,20}$/; //대문자,소문자,숫자 8~20자리수
  
  const isPassedEmail = () => {
    if (userEmail === "") { //입력 0
      return setEmailStatus("입력하세요.");
    } else if (emailRegEx.test(userEmail)) { //성공
      return setEmailStatus("성공");
    } else { //땡
      return setEmailStatus("정확한 이메일 주소를 입력하세요.");
    }
  };

  const isPassedPassword = () => {
    if (password === "") { //입력 0
      return setPasswordStatus("입력하세요.");
    } else if (password.match(passwordRegEx)===null) { //성공
      return setPasswordStatus("땡");
    } else { //땡
      return setPasswordStatus("성공");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    return console.log(form); //확인용
  };

  return (
    <main className={styles.wrapper}>
      <section>
        <div className={styles.left}>
          <h1>M-archive</h1>
          <form id="loginForm" className={styles.loginForm} onSubmit={onSubmit}>
            <Input
              placeholder="이메일주소"
              className={styles.inputWrapper}
              name="userEmail"
              value={form.userEmail}
              onChange={onChange}
              errorText={emailStatus}
            />
            <Input
              className={styles.inputWrapper}
              // type="password"
              placeholder="비밀번호"
              name="password"
              value={form.password}
              onChange={onChange}
              errorText={passwordStatus}
            />

            <Button width={"big"} type="submit" form="loginForm">
              로그인
            </Button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>
            Hello,
            <br />
            안녕하세요?
          </h1>
          <p>
            회원가입하시고,
            <br />
            저희와 기록을 남겨요
          </p>
          <Button
            width={"big"}
            border={"borderwhite"}
            type="submit"
            form="loginForm"
          >
            회원가입
          </Button>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
