import React, { useEffect, useRef, useState } from 'react';
import styles from './start.module.scss';
import { Button } from '../../../components/Common';
import { useNavigate } from 'react-router-dom';
import bg from './cloud.mp4';
const Start = () => {
  const completedTitle = `이제는 감상도 공유하는 시대!     
   다양한 관점에서 바라보는 새로운 시선과 
   재미있는 스토리들을 만나보세요~ : )`;

  const [title, setTitle] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      setTitle((prev) => {
        let result = prev ? prev + completedTitle[count] : completedTitle[0];
        setCount(count + 1);

        if (count >= completedTitle.length) {
          setCount(0);
          setTitle('');
        }
        return result;
      });
    }, 125);

    return () => {
      clearInterval(typingInterval);
    };
  });

  const videoRef = useRef();
  const setPlayBackRate = () => {
    videoRef.current.playbackRate = 0.5;
  };

  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
  };

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

      <section className={styles.sectionWrapper}>
        <h1 className={styles.header}>M - archive</h1>
        <div className={styles.section}>
          {/* 어서와요 *^^* (타이핑 애니메이션) 투명도 opacity 0.5 적용 */}
          {title}
        </div>
        <Button
          width={'big'}
          type={'submit'}
          form="loginForm"
          onClick={navigateToLogin}
          className={styles.button}
        >
          시작하기
        </Button>
      </section>
    </main>
  );
};

export default Start;
