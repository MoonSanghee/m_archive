import { useState } from "react";
import Button from "./Button";
// import styles from "./Button/button.module.scss";
import Footer from "./Footer";
import styles from "./style.module.scss";
const Im = () => {
  //
  let data = [
    "로맨스",
    "드라마",
    "코미디",
    "액션",
    "스릴러",
    "미스터리",
    "SF",
    "공포",
  ];

  let [btnActive, setBtnActive] = useState("");

  const toggleActive = (e) => {
    setBtnActive((prev) => {
      return e.target.value;
    });
  };

  //

  return (
    <div className={styles.main}>
      <div>
        <h2 className={styles.text}>로그인,회원가입</h2>
        <Button width={"big"} border={"border_white"}>
          로그인
        </Button>
        <Button width={"big"}>회원가입</Button>
        <Button width={"big"} border={"border"}>
          로그인
        </Button>
      </div>

      <div>
        <h2 className={styles.text}>장르버튼</h2>
        <Button width={"middle"}>로맨스</Button>
        <Button width={"small"}>로맨스</Button>
        <Button width={"middle"} border={"border"}>
          스릴러
        </Button>
        <Button border={"border"} width={"small"}>
          액션
        </Button>
      </div>
      <div>
        <h2 className={styles.text}>
          장르 하나 선택 장르 (다중 선택 - 우짬...🫠)
        </h2>
        {data.map((item, idx) => {
          return (
            <Button
              key={idx}
              value={idx}
              width={"small"}
              color={"border" + (idx == btnActive ? " active" : "")}
              onClick={toggleActive}
            >
              {item}
            </Button>
          );
        })}
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

      {/* <h2>확인</h2>
      <Button style={{ fontSize: "16px" }}>확인</Button> */}

      <h2 className={styles.text}>푸터</h2>
      <Footer />
    </div>
  );
};

export default Im;
