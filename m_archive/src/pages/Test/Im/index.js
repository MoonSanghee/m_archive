import { useState } from "react";
import Button from "../.././../components/Common/Button";
import Footer from "../../../components/Layout/Footer";
import { Tag } from "../../../components/Common";
import styles from "./style.module.scss";
import { Card } from "../../../components/Common";

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

  //
  const movieListTest = [
    {
      id: 1,
      title: "스즈메의 문단속",
      postImage:
        "https://an2-img.amz.wtchn.net/image/v2/9XDeIclRe6SdKDknD_aGWg.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk1qZ3dlRFF3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpFMk56VTJOVE16TlRNNE9EVTVNVEEyTURVaWZRLkg5WWVENmVKWTdfYl9hNkdhdThHU0E2U1VCR3dqZkMxX0c4c2NnQ1NWVFE",
      plot: `“이 근처에 폐허 없니? 문을 찾고 있어”
규슈의 한적한 마을에 살고 있는 소녀 ‘스즈메’는 문을 찾아 여행 중인 청년 ‘소타’를 만난다. 그의 뒤를 쫓아 산속 폐허에서 발견한 낡은 문. 스즈메가 무언가에 이끌리듯 문을 열자 마을에 재난의 위기가 닥쳐오고 가문 대대로 문 너머의 재난을 봉인하는 소타를 도와 간신히 문을 닫는다.
 
“닫아야만 하잖아요, 여기를!”
재난을 막았다는 안도감도 잠시, 수수께끼의 고양이 ‘다이진’이 나타나 소타를 의자로 바꿔 버리고 일본 각지의 폐허에 재난을 부르는 문이 열리기 시작하자 스즈메는 의자가 된 소타와 함께 재난을 막기 위한 여정에 나선다.
 
“꿈이 아니었어”
규슈, 시코쿠, 고베, 도쿄. 재난을 막기 위해 일본 전역을 돌며 필사적으로 문을 닫아가던 중 어릴 적 고향에 닿은 스즈메는 잊고 있던 진실과 마주하게 되는데… `,
      genres: "스릴러",
    },
    {
      id: 2,
      title: "더 퍼스트 슬램덩크",
      postImage:
        "https://an2-img.amz.wtchn.net/image/v2/HaTjW_4v3cZnU9ukZvTSrw.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk1qZ3dlRFF3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpFMk56RTNOalk0TlRjMU1EVTFNamMzTWpVaWZRLncyaWZ6TU1LM2hGUy1GNnhKczlDNzFlYkVuMDZMb2ZyZXdaMWI3SjZxS1k",
      plot: `전국 제패를 꿈꾸는 북산고 농구부 5인방의 꿈과 열정, 멈추지 않는 도전을 그린 영화`,
      genres: "애니메이션/스포츠 ",
    },
    {
      id: 3,
      title: "던전 앤 드래곤: 도적들의 명예",
      postImage:
        "https://an2-img.amz.wtchn.net/image/v2/GwaxY2TYFitPuOQ43snlBQ.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk1qZ3dlRFF3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpFMk56Z3dPVFU0TURJNU56azVNVGMzTWpRaWZRLlB4bWVTdWtHbmtWMWxQVE1ETjlTUGlMV3BDNDNWN24zZDl3akNnWGRZWE0",
      plot: `한때는 명예로운 기사였지만, ‘어떤 사건’ 이후 ‘홀가’, ‘사이먼’, ‘포지’와 함께 도적질을 하게 된 ‘에드긴’. ‘소피나’의 제안으로 ’부활의 서판’을 얻기 위해 ‘코린의 성’에 잠입하지만 포지와 소피나의 배신으로 실패하고 감옥에 갇힌다. 기발한 방법으로 탈옥에 성공한 에드긴과 홀가는 소중한 사람들과 다시 만나고, ‘부활의 서판’도 되찾기 위해 자신만의 팀을 꾸리기 시작하는데… 옛 동료인 소질 없는 소서러 사이먼과 새롭게 합류한 변신 천재 드루이드 '도릭’, 재미 빼고 다 가진 팔라딘 '젠크’까지 어딘가 2% 부족한 오합지졸로 가득한 이 팀, 과연 무사히 모험을 끝마칠 수 있을까?

      <가디언즈 오브 갤럭시> 제작진이 선보이는
      매력만점 롤플레잉 액션 어드벤처 무비가 온다!`,
      genres: "액션/모험/판타지",
    },
  ];

  return (
    <div className={styles.main}>
      <h2 className={styles.text}>카드</h2>
      <div style={{ display: "flex" }}>
        {/* flex 임시 */}
        {movieListTest.length > 0 &&
          movieListTest.map((item) => {
            return <Card key={item.id} item={item} />;
          })}
      </div>
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
