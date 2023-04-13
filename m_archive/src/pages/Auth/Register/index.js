import React, { useRef, useState } from 'react';
import styles from './register.module.scss';
import { Button, Input } from '../../../components';
import { useNavigate } from 'react-router-dom';
import { saveTokens } from '../../../utils/';
import { register } from '../../../api/Auth';
import bg from '../Start/cloud.mp4';

import {
  validateName,
  validateNickname,
  validateEmail,
  validatePassword,
  validateCheckpassword,
} from './utils';

const Register = () => {
  const videoRef = useRef();
  const setPlayBackRate = () => {
    videoRef.current.playbackRate = 0.5;
  };

  //기능
  const [form, setForm] = useState({
    name: '',
    nickname: '',
    email: '',
    password: '',
    checkpassword: '',
  });

  const [touched, setTouched] = useState({
    name: false,
    nickname: false,
    email: false,
    password: false,
    checkpassword: false,
  });

  const [status, setStatus] = useState({
    name: '',
    nickname: '',
    email: '',
    password: '',
    checkpassword: '',
  });
  const [font, setFont] = useState({
    fontFamily: 'Arial',
  });
  const navigate = useNavigate();

  const onClickedLogin = () => {
    navigate('/login');
  };

  const onChange = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: false });
    setForm({ ...form, [name]: e.currentTarget.value });
  };

  const onBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    console.log(validatedForm); //true면 api 보내기
    if (!validatedForm) {
      //false면리턴
      return;
    }
    const resgisterData = {
      email: form.email,
      name: form.name,
      nickname: form.nickname,
      password: form.password,
    };

    const response = await register(resgisterData);
    if (response.status === 200) {
      const data = response.data;
      saveTokens(data);
      navigate('/registerGenre');
    }
  };

  //메시지
  const validatedName = validateName(form.name);
  const validatedNickname = validateNickname(form.nickname);
  const validatedEmail = validateEmail(form.email);
  const validatedPassword = validatePassword(form.password);
  const validatedCheckpassword = validateCheckpassword(
    form.checkpassword,
    form.password,
  );

  //폼 유효성
  const validatedForm =
    !validatedName &&
    !validatedNickname &&
    !validatedEmail &&
    !validatedPassword &&
    !validatedCheckpassword
      ? true
      : false;

  return (
    <main className={styles.wrapper}>
      <video
        muted
        autoPlay
        loop
        ref={videoRef}
        onCanPlay={() => setPlayBackRate()}
      >
        <source src={bg} />
        {/* <strong>Your browser does not support the video tag.</strong> */}
      </video>
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
            width={'big'}
            border={'borderwhite'}
            type="submit"
            form="loginForm"
            onClick={onClickedLogin}
          >
            로그인
          </Button>
        </div>
        <div className={styles.formContainer}>
          <h1>M-archive</h1>
          <form
            id="registerForm"
            className={styles.loginForm}
            onSubmit={onSubmit}
          >
            <Input
              placeholder="사용자의 이름을 입력해주세요"
              className={styles.inputWrapper}
              name="name"
              autoComplete="off"
              onChange={onChange}
              onBlur={onBlur}
              value={form.name}
              errorText={touched.name && validatedName}
            />
            <Input
              placeholder="닉네임을 입력해주세요"
              className={styles.inputWrapper}
              name="nickname"
              autoComplete="off"
              onChange={onChange}
              onBlur={onBlur}
              value={form.nickname}
              errorText={touched.nickname && validatedNickname}
            />
            <Input
              placeholder="이메일주소를 입력해주세요"
              className={styles.inputWrapper}
              name="email"
              autoComplete="off"
              onChange={onChange}
              onBlur={onBlur}
              value={form.email}
              errorText={touched.email && validatedEmail}
            />
            <Input
              className={styles.inputWrapper}
              type="password"
              placeholder="비밀번호"
              name="password"
              autoComplete="off"
              onChange={onChange}
              onBlur={onBlur}
              value={form.password}
              errorText={touched.password && validatedPassword}
            />
            <Input
              className={styles.inputWrapper}
              type="password"
              placeholder="비밀번호 재확인"
              name="checkpassword"
              autoComplete="off"
              onChange={onChange}
              onBlur={onBlur}
              value={form.checkpassword}
              errorText={touched.checkpassword && validatedCheckpassword}
            />
          </form>
          <Button width={'big'} type="submit" form="registerForm">
            회원가입
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Register;
