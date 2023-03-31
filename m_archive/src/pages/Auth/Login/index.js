import React, { useState } from 'react';
import styles from './login.module.scss';
import { Button, Input } from '../../../components';
import { useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from './utils';
import { getTokens, saveTokens } from '../../../utils';
import { login } from '../../../api/Auth';

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userEmail: '',
    password: '',
  });
  const [emailStatus, setEmailStatus] = useState('');
  const [passwordStatus, setPasswordStatus] = useState('');


  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    setForm({ ...form, [name]: value });
  };

  const onClickedRegister = () => {
    navigate('/register');
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const validatedEmail = validateEmail(form.userEmail);
    const validatedPassword = validatePassword(form.password);

    //submit 눌렀을때 오류메시지 수정
    if (typeof validatedEmail !== Boolean) {
      setEmailStatus(validatedEmail);
      //NOTE: return을 넣어서 다음 코드가 실행되지 않도록 설정
      
      //return;
    }
    if (typeof validatedPassword !== Boolean) {
      setPasswordStatus(validatedPassword);
      
      //return;
    }

    //폼 유효성
    const validatedForm = !validatedEmail && !validatedPassword ? true : false;

    if(validatedForm){
      //console.log(form); //확인용
      //console.log(validatedForm); //확인용
  
      const loginData = {
        email: form.userEmail,
        password: form.password,
      };
  
      const response = await login(loginData);
      if (response.status === 200) {
        const data = response.data;
        saveTokens(data);
        navigate('/movies');
      }
    }else{
      console.log("invalid form");
    }
   
  };

  return (
    <main className={styles.wrapper}>
      <section>
        <div className={styles.formContainer}>
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
              type="password"
              placeholder="비밀번호"
              name="password"
              value={form.password}
              onChange={onChange}
              errorText={passwordStatus}
            />
          </form>
          <Button width={'big'} type="submit" form="loginForm">
            로그인
          </Button>
        </div>
        <div className={styles.overlayContainer}>
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
            width={'big'}
            border={'borderwhite'}
            type="submit"
            form="loginForm"
            onClick={onClickedRegister}
          >
            회원가입
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Login;
