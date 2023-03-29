import { useState } from "react";
import styles from "./kim.module.scss";
import { Button } from "../../../components";
import { Tag } from "../../../components/Common";
import { ProfileIcon } from "../../../assets/icon";
const Kim2 = () =>{

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

  const [pick, setPick] = useState(genre);
  const [select, setSelect] = useState([]);
    return(
        <main>
            <section className={styles.profile}>
                <ProfileIcon className={styles.icon}></ProfileIcon>
                <div className={styles.textInput}>
                  <div>소개글</div>
                  <div>
                      <p>닉네임</p>
                      <input />
                  </div>
                  <div>
                      {/* 수정 불가  */}
                      <p>이메일</p>
                      <input />
                  </div>
                  <div>
                      <p>비밀번호 변경</p>
                      <input />
                  </div>
                  <div>
                      <p>새 비밀번호 확인</p>
                      <input />
                  </div>
                </div>
                
            </section>
          <section className={styles.tag}>
        <h2 className={styles.text}>선호 장르</h2>
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
      </section>
        </main>
    )
}
export default Kim2;