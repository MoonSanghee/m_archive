import { useState, useEffect } from "react";
import styles from "./profile.module.scss";
import { Tag } from "../../../components/Common";
import { ProfileIcon } from "../../../assets/icon";
import axios from 'axios';

// 현재 틀만 만드는중 나중에 따로 코드 수정 예정 .
// user 데이터 끌어오는 방법 보는중 .
// api 건드는중 .
const Profile = () =>{

  const genre = [
    { id: 1, genre: "로맨스" },
    { id: 2, genre: "드라마" },
    { id: 3, genre: "코미디" },
    { id: 4, genre: "액션" },
    { id: 5, genre: "스릴러" },
    { id: 6, genre: "미스터리" },
    { id: 7, genre: "SF" },
    { id: 8, genre: "공포" },
  ];

  const [userInfo, setUserInfo] = useState(null);
  const [pick, setPick] = useState(genre);
  const [select, setSelect] = useState([]);

  // 프로필 정보를 저장할 상태 변수
  const [profile, setProfile] = useState({
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
  });

  // 프로필 정보를 입력할 때마다 상태 변수에 저장
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  // 수정 버튼 클릭 시 API 호출
  const handleSubmit = async () => {
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

  return (
    <main>
    <div className={styles.container}>
      <h1>프로필 수정</h1>
      <div className={styles.profileInfo}>
        <ProfileIcon profileImage={profile.profileImage} />
        <textarea name="description" value={profile.description} onChange={handleChange} placeholder="소개글"></textarea>
      </div>
      <div className={styles.textInput}>
        <div>
          <p>닉네임 <input name="nickname" value={profile.nickname} onChange={handleChange} /></p>
        </div>
        <div>
          {/* 수정 불가 */}
          <p>이메일 {profile.email}</p>
        </div>
        <div>
          <p>비밀번호 변경 <input type="password" name="password" onChange={handleChange} /></p>
        </div>
        <div>
          <p>새 비밀번호 확인 <input type="password" name="passwordConfirm" onChange={handleChange} /></p>
        </div>
      </div>
      <button onClick={handleSubmit}>수정</button>
    </div>
          <section className={styles.tag}>
        <h2 className={styles.text}>선호 장르</h2>
        <div className={styles.buttonTag}>
        {pick.map((item) => {
          const onClickBtn = () => {
            !select.includes(item)
              ? setSelect((select) => [...select, item])
              : setSelect(select.filter((button) => button !== item));
            console.log(select);
          };
          return (
            <Tag
              key={item.id}
              // width={"middle"}
              border={"border" + (select.includes(item) ? " active" : "")}
              onClick={onClickBtn}
            >
              {item.genre}
            </Tag>
          );
        })}
        </div>
      </section>
        </main>
    );
};
export default Profile;
