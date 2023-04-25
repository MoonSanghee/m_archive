import React, { useEffect, useRef, useState } from 'react';
import styles from './registergenre.module.scss';
import { Button, Input, Tag } from '../../../components';
import { useNavigate } from 'react-router-dom';
import genre from '../../Home/Genre/genre';
import { getMe, modifyUser } from '../../../api/Users';
import bg from '../Start/cloud.mp4';

const RegisterGenre = () => {
  const videoRef = useRef();
  const setPlayBackRate = () => {
    videoRef.current.playbackRate = 0.5;
  };

  const navigate = useNavigate();
  const [state, setState] = useState(false);
  const [genreMovies, setGenreMovies] = useState([]);
  const [pick, setPick] = useState(genre);
  const [select, setSelect] = useState([]); //선택한 tag 배열

  const [user, setUser] = useState([]);

  const onClickBtn = (item) => {
    return () => {
      !select.includes(item)
        ? setSelect((select) => [...select, item])
        : setSelect(select.filter((button) => button !== item));
    };
  };

  const onGetUser = async () => {
    const response = await getMe();

    if (response.status === 200) {
      const items = response.data;
      setUser(items);
    }
  };

  // console.log(user); //사용자정보
  // console.log(user.id); //사용자아이디

  const onFetchGenres = async () => {
    const userData = {
      //NOTE: id배열을 보내야함
      preferredGenres: select.map((item) => item.id), //select는 선택한 태그
    };

    console.log(userData);

    const response = await modifyUser(userData);
    if (response.status === 204) {
      console.log('정상');
    } else {
      console.log('에러');
    }
  };

  const onClickSubmit = () => {
    navigate('/movies');
    onFetchGenres();
  };

  const onClickSkip = () => {
    navigate('/movies', { state: true });
  };

  useEffect(() => {
    onGetUser();
  }, []);

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
        </div>
        <div className={styles.formContainer}>
          <h1>M-archive</h1>
          <div className={styles.genreButtons}>
            {pick.map((item) => {
              return (
                <Tag
                  key={item.id}
                  width={'big'}
                  border={'border' + (select.includes(item) ? ' active' : '')}
                  onClick={onClickBtn(item)}
                >
                  {item.name}
                </Tag>
              );
            })}
          </div>
          <div className={styles.buttons}>
            <Button width={'long'} onClick={onClickSubmit}>
              확인
            </Button>
            <Button width={'long'} onClick={onClickSkip} border={'border'}>
              건너뛰기
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RegisterGenre;
