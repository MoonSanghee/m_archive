import { useState, useEffect } from 'react';
import styles from './profile.module.scss';
import {
  Tag,
  ProfileIcon,
  Input,
  Toggle,
  Button,
} from '../../../components/Common';
//import { ProfileIcon } from "../../../assets/icon";
import axios from 'axios';
import genre from '../../Home/Genre/genre';
import { useMe } from '../../../hooks';
import { useAsync, useMount } from 'react-use';
import { Modal } from '../../../components/Common';
import useModal from '../../../components/Common/Modal/useModal';
import IconModal from './IconModal';
import { useCallback } from 'react';
import { ReviewModifyIcon } from '../../../assets/icon';
import {
  validateNickname,
  validatePassword,
  validateCheckpassword,
} from '../../Auth/Register/utils';
import { modifyUser } from '../../../api/Users';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {useRecoilState, useSetRecoilState} from "recoil";
import { meState} from '../../../recoil';
import { getMe } from "../../../api/Users";

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [me,setMe] = useRecoilState(meState);
  const [pick, setPick] = useState(genre);
  const [select, setSelect] = useState([]);
  const [modalOption, showModal] = useModal();
  const [form, setForm] = useState({
    nickname: '',
    description: '',
    password: '',
    checkpassword: '',
    profileImage: '',
    preferredGenres: [],
  });

  const [touched, setTouched] = useState({
    nickname: false,
    password: false,
    checkpassword: false,
  });

  const onBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };
  //select.map((item) => item.id)
  const onClickBtn = (item) => {
    return () => {
      !select.includes(item)
        ? setSelect((select) => [...select, item])
        : setSelect(select.filter((button) => button !== item));
    };
  };

  // 프로필 정보를 입력할 때마다 상태 변수에 저장
  const onChange = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: false });
    setForm({
      ...form,
      [name]: value,
    });
  };

  // 저장 버튼 클릭 시 API 호출
  //NOTE: 수정하고 나서 getMe 호출
  const onSubmit = async (e) => {
    e.preventDefault();
    if ((touched.password || touched.checkpassword) && !validatedForm) {
      console.log("not submit");
      return;
    }

    const userData = {
      nickname: form?.nickname,
      description: form?.description,
      profileImage: form?.profileImage,
      preferredGenres: select.map((item) => item.id), //select는 선택한 태그
    };
    if(touched.password){
      userData.password = form?.password;
    }
  
    const response = await modifyUser(userData);
    if (response.status === 204) {
      console.log('프로필 정상 수정!');
      onGetMe();
    } else {
      console.log('프로필 수정 에러!');
    }
    
  };

  const getProfileImage = (name) => {
    setForm({
      ...form,
      ['profileImage']: name,
    });
  };
  const onClickOpenModal = useCallback(() => {
    showModal(
      true,
      '',
      null,
      null,
      <IconModal
        getProfileImage={getProfileImage}
        onClose={() => modalOption.onClose()}
      />,
    );
  }, [modalOption, getProfileImage]);

  const onClickToggle =async () =>{
    const userData = {
     isPreferenceView:!me?.isPreferenceView,
    }
    const response = await modifyUser(userData);
    if(response.status === 204){
      onGetMe();
    }else{
      console.log("토글클릭에러 !");
    }
  }
  useEffect(() => {
    setForm({
      nickname: me?.nickname,
      description: me?.description,
      password: '',
      checkpassword: '',
      profileImage: me?.profileImage,
      });
    setSelect([]);
    me?.preferredGenres?.forEach((item) => {
      setSelect((select) => [...select, item]);
    });
  }, [me]);
  

  const onGetMe = async()=>{
    const response = await getMe();
    if(response.status===200){
      setMe(response.data);
    }
  }


  useMount(()=>{
    onGetMe();
  })
 
  const validatedNickname = validateNickname(form?.nickname);
  const validatedPassword = validatePassword(form?.password);
  const validatedCheckpassword = validateCheckpassword(
    form?.checkpassword,
    form?.password,
  );
  const validatedForm =
    !validatedNickname && !validatedPassword && !validatedCheckpassword
      ? true
      : false;
  return (
    <main className={styles.wrapper}>
      <section className={styles.profileContainer}>
        <h1>프로필 수정</h1>
        <div className={styles.profileInfo}>
          <div className={styles.profileWrapper}>
            <div className={styles.iconsWrapper}>
              <ProfileIcon
                user={me}
                className={styles.profileIcon}
                onClick={onClickOpenModal}
                profileImage={form?.profileImage}
              />
              <ReviewModifyIcon className={styles.modifyIcon} />
            </div>

            <textarea
              name="description"
              value={form?.description}
              onChange={onChange}
              placeholder="소개글"
            ></textarea>
          </div>
          <div className={styles.inputsWrapper}>
            <Input
              name="nickname"
              value={form?.nickname}
              onChange={onChange}
              onBlur={onBlur}
              className={styles.input}
              //autoComplete="off"
              errorText={touched?.nickname && validatedNickname}
              label="닉네임"
            />
            <Input
              name="email"
              value={me?.email}
              //onChange={onChange}
              className={styles.input}
              //autoComplete="off"
              label="이메일"
            />
            <Input
              name="password"
              value={form?.password}
              onChange={onChange}
              onBlur={onBlur}
              type="password"
              className={styles.input}
              label="비밀번호"
              //autoComplete="off"
              errorText={touched?.password && validatedPassword}
            />
            <Input
              name="checkpassword"
              value={form?.checkpassword}
              onChange={onChange}
              onBlur={onBlur}
              type="password"
              className={styles.input}
              label="비밀번호 확인"
              //autoComplete="off"
              errorText={touched?.checkpassword && validatedCheckpassword}
            />
          </div>
        </div>
      </section>
      <section className={styles.genreContainer}>
        <h1>
          {'선호 장르'}
          <Toggle checked={me?.isPreferenceView} onChange={onClickToggle}/>{' '}
        </h1>
        <div className={styles.tagsWrapper}>
          {pick.map((item) => {
            return (
              <Tag
                key={item.id}
                // width={"middle"}
                border={
                  'border' +
                  (select.some((genre) => genre.id === item.id)
                    ? ' active'
                    : '')
                }
                onClick={onClickBtn(item)}
              >
                {item.name}
              </Tag>
            );
          })}
        </div>
      </section>
      <span>
        <Button onClick={onSubmit}>저장</Button>
      </span>
      <Modal
        modalOption={modalOption}
        modalSize="small"
        className={styles.iconModal}
      />
    </main>
  );
};
export default Profile;
