import React, { useState } from 'react';
import styles from './registergenre.module.scss';
import { Button, Input, Tag } from '../../../components';
import { useNavigate } from 'react-router-dom';
import genre from '../../Home/Genre/genre';

const RegisterGenre = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(false);
  const [genreMovies, setGenreMovies] = useState([]);
  const [pick, setPick] = useState(genre);
  const [select, setSelect] = useState([]); //선택한 tag 배열

  const onClickBtn = (item) => {
    return () => {
      !select.includes(item)
        ? setSelect((select) => [...select, item])
        : setSelect(select.filter((button) => button !== item));
    };
  };

  const onClickSubmit = () => {
    navigate('/movies');
  };
  const onClickSkip = () => {
    navigate('/movies', { state: true });
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
                  {item.genre}
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
