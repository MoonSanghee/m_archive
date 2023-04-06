import { useState, useEffect } from "react";
import styles from "./profile.module.scss";
import { Tag ,ProfileIcon,Input,Toggle,Button} from "../../../components/Common";
//import { ProfileIcon } from "../../../assets/icon";
import axios from 'axios';
import genre from "../../Home/Genre/genre";
import { useMe } from "../../../hooks";
import { useMount } from "react-use";
import {Modal} from "../../../components/Common";
import useModal from "../../../components/Common/Modal/useModal";
import IconModal from "./IconModal";
import { useCallback } from "react";
import {ReviewModifyIcon} from "../../../assets/icon";

const Profile = () =>{
  const me = useMe();
  //const [userInfo, setUserInfo] = useState(null);
  const [pick, setPick] = useState(genre);
  const [select, setSelect] = useState([]);
  const [modalOption, showModal] = useModal();
  const [form,setForm] = useState({
    nickname: '',
    description: '',
    password:'',
    checkPassword:'',
    profileImage:'',
    preferredGenres:[],
  })
  
  const onClickBtn = (item) => {
    return () => {
      !select.includes(item)
        ? setSelect((select) => [...select, item])
        : setSelect(select.filter((button) => button !== item));
    };
  };

  // 프로필 정보를 입력할 때마다 상태 변수에 저장
  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // 저장 버튼 클릭 시 API 호출
  const onSubmit = async (e) => {
    console.log(form);
  };

  const onClickOpenModal = useCallback(() => {
    showModal(
      true,
      '',
      null,
      null,
      <IconModal
          onClose={() => {
          //NOTE: 생성/수정/삭제와 같이 데이터를 변경하는 API를 사용한다면 -> API 요청 완료 후에 재요청을 해야한다~
          modalOption.onClose();
          if (!me) {
            return;
          } 
        }}
      />,
    );
  }, [ modalOption]);
  useMount(()=>{
    setForm({
      nickname: me?.nickname,
      description: me?.description,
      password:me?.password,
      checkPassword:me?.password,
      profileImage:me?.profileImage,
    })
    
  })
  return (
    <main className={styles.wrapper}>
      <section className={styles.profileContainer}>
        <h1>프로필 수정</h1>
        <div className={styles.profileInfo}>
          <div className={styles.profileWrapper}>
            <div className={styles.iconsWrapper}>
              <ReviewModifyIcon className={styles.modifyIcon}/>
              <ProfileIcon className={styles.profileIcon} />
              <ProfileIcon className={styles.overlay} onClick={onClickOpenModal}/>
            </div>
           
            <textarea name="description" value={form.description} onChange={onChange} placeholder="소개글"></textarea>
          </div>
          <div className={styles.inputsWrapper}>         
            <Input name="nickname" value={form.nickname} onChange={onChange} className={styles.input} label="닉네임"/>
            <Input name="email" value={me?.email} onChange={onChange} className={styles.input} label="이메일"/>
            <Input name="password" value={form.password} onChange={onChange} type="password" className={styles.input} label="비밀번호"/>
            <Input name="checkPassword" value={form.checkPassword} onChange={onChange} type="password" className={styles.input} label="비밀번호 확인"/>
          </div>
        </div>
      </section>
        <section className={styles.genreContainer}>
          <h1>{"선호 장르"}<Toggle/> </h1>
          <div className={styles.tagsWrapper}>
          {pick.map((item) => {
            return (
              <Tag
                key={item.id}
                // width={"middle"}
                border={"border" + (select.includes(item) ? " active" : "")}
                onClick={onClickBtn(item)}
              >
                {item.name}
              </Tag>
            );
          })}
          </div>
        </section>
        <span><Button onClick={onSubmit}>저장</Button></span>
        <Modal modalOption={modalOption} modalSize="small" />
      </main>
    );
};
export default Profile;
