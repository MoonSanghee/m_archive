import { useState } from "react";
import Button from "../.././../components/Common/Button";
import Footer from "../../../components/Layout/Footer";
import Tag from "../../../components/Common/Tag";
import styles from "./style.module.scss";

const Im = () => {
  //장르 선택시 토글
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
  const [select, setSelect] = useState([]); //선택한 tag 배열
  //

  return (
    <div className={styles.main}>
      <div>
        <h2 className={styles.text}>로그인,회원가입</h2>
        <Button width={"big"} border={"borderwhite"}>
          로그인
        </Button>
        <Button width={"big"}>회원가입</Button>
        <Button width={"big"} border={"border"}>
          로그인
        </Button>
      </div>

      <div>
        <h2 className={styles.text}>확인,건너뛰기</h2>
        <Button width={"long"}>확인</Button>
        <Button width={"long"} border={"border"}>
          건너뛰기
        </Button>
      </div>

      <div>
        <h2 className={styles.text}>확인, 삭제 저장</h2>
        <Button>확인</Button>
        <Button color={"gray"}>삭제</Button>
        <Button color={"secondary"}>저장</Button>
      </div>

      <div>
        <h2 className={styles.text}>Tag 장르 스타일 미리보기</h2>
        <Tag width={"middle"}>로맨스</Tag>
        <Tag>로맨스</Tag>
        <Tag width={"middle"} border={"border"}>
          스릴러
        </Tag>
        <Tag border={"border"}>액션</Tag>
      </div>

      <div>
        <h2 className={styles.text}>Tag 장르 다중 선택</h2>
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

      {/* <h2>확인</h2>
      <Button style={{ fontSize: "16px" }}>확인</Button> */}

      <h2 className={styles.text}>푸터</h2>
      <Footer />
    </div>
  );
};

export default Im;
