import { useState, useEffect } from "react";
import styles from "./profile.module.scss";
import { Tag ,ProfileIcon,Input,Toggle,Button} from "../../../components/Common";
//import { ProfileIcon } from "../../../assets/icon";
import axios from 'axios';
import genre from "../../Home/Genre/genre";
import { useMe } from "../../../hooks";
import { useMount } from "react-use";
// 현재 틀만 만드는중 나중에 따로 코드 수정 예정 .
// user 데이터 끌어오는 방법 보는중 .
// api 건드는중 .
const Profile = () =>{
  const me = useMe();
  const [userInfo, setUserInfo] = useState(null);
  const [pick, setPick] = useState(genre);
  const [select, setSelect] = useState([]);
  const [form,setForm] = useState({
    nickname: '',
    description: '',
    password:'',
    checkPassword:'',
    profileImage:'',
  })
  // 프로필 정보를 저장할 상태 변수
  /*const [profile, setProfile] = useState({
    id: '',
    name: '',
    birth: '',
    nickname: '',
    email: '',
    description: '',
    profileImage: '',
    gender: '',
    preferredGenres: [],
    createdAt: '',
    updatedAt: '',
  });*/

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

  // 수정 버튼 클릭 시 API 호출
  const onSubmit = async (e) => {
    //e.preventDefault();
    try {
      const res = await axios.put("/users/me", profile); 
      // API 주소
      console.log(res.data);
      // 수정 성공 시 처리
    } catch (err) {
      console.error(err);
      // 수정 실패 시 처리
    }
  };
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
            <ProfileIcon className={styles.profileIcon} />
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
                {item.genre}
              </Tag>
            );
          })}
          </div>
        </section>
        <span><Button onClick={onSubmit}>저장</Button></span>
      </main>
    );
};
export default Profile;
