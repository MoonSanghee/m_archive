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

  useEffect(() => {
    axios.get('http://ec2-3-39-25-160.ap-northeast-2.compute.amazonaws.com/users/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => {
      setUserInfo(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  }, []);
  if (!userInfo) {
    return <div>Loading...</div>;
  }
    return(
        <main>
            <section className={styles.profile}>
                <div className={styles.sideIcon}> 
                <div>
                  <img src={userInfo.profileImage} alt={userInfo.name} />
                    <h1>{userInfo.name}</h1>
                    <p>{userInfo.email}</p>
                    <p>{userInfo.birth}</p>
                    <p>{userInfo.description}</p>
                </div>
                {/* 밑에 내용은 그냥 틀  (삭제 예정) */}
                <ProfileIcon></ProfileIcon>
                <textarea>소개글</textarea>
                </div>
                <div className={styles.textInput}>
                  
                  <div>
                      <p>닉네임 <input /></p>
                  </div>
                  <div>
                      {/* 수정 불가  */}
                      <p>이메일 <input /></p>
                  </div>
                  <div>
                      <p>비밀번호 변경 <input /></p>
                  </div>
                  <div>
                      <p>새 비밀번호 확인 <input /></p>
                  </div>
                </div>
                
            </section>
            {/* 윗부분 삭제 예정 */}
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
