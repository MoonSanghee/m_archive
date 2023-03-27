import React from "react";
import styles from "./home.module.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {getMovies}  from "../../api/Movies";
import { useState ,useEffect} from "react";
import Carousel from "./Carousel";

const Home = () =>{
    
    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    //const [searchText, setSearchText] = useState("");
  
    const movieListTest = [
        {
          id: "1",
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
          id: "2",
          title: "더 퍼스트 슬램덩크",
          postImage:
            "https://an2-img.amz.wtchn.net/image/v2/HaTjW_4v3cZnU9ukZvTSrw.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk1qZ3dlRFF3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpFMk56RTNOalk0TlRjMU1EVTFNamMzTWpVaWZRLncyaWZ6TU1LM2hGUy1GNnhKczlDNzFlYkVuMDZMb2ZyZXdaMWI3SjZxS1k",
          plot: `전국 제패를 꿈꾸는 북산고 농구부 5인방의 꿈과 열정, 멈추지 않는 도전을 그린 영화`,
          genres: "애니메이션/스포츠 ",
        },
        {
          id: "3",
          title: "던전 앤 드래곤: 도적들의 명예",
          postImage:
            "https://an2-img.amz.wtchn.net/image/v2/GwaxY2TYFitPuOQ43snlBQ.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk1qZ3dlRFF3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpFMk56Z3dPVFU0TURJNU56azVNVGMzTWpRaWZRLlB4bWVTdWtHbmtWMWxQVE1ETjlTUGlMV3BDNDNWN24zZDl3akNnWGRZWE0",
          plot: `한때는 명예로운 기사였지만, ‘어떤 사건’ 이후 ‘홀가’, ‘사이먼’, ‘포지’와 함께 도적질을 하게 된 ‘에드긴’. ‘소피나’의 제안으로 ’부활의 서판’을 얻기 위해 ‘코린의 성’에 잠입하지만 포지와 소피나의 배신으로 실패하고 감옥에 갇힌다. 기발한 방법으로 탈옥에 성공한 에드긴과 홀가는 소중한 사람들과 다시 만나고, ‘부활의 서판’도 되찾기 위해 자신만의 팀을 꾸리기 시작하는데… 옛 동료인 소질 없는 소서러 사이먼과 새롭게 합류한 변신 천재 드루이드 '도릭’, 재미 빼고 다 가진 팔라딘 '젠크’까지 어딘가 2% 부족한 오합지졸로 가득한 이 팀, 과연 무사히 모험을 끝마칠 수 있을까?
    
          <가디언즈 오브 갤럭시> 제작진이 선보이는
          매력만점 롤플레잉 액션 어드벤처 무비가 온다!`,
          genres: "액션/모험/판타지",
        },
        {
            id: "4",
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
            id: "5",
            title: "더 퍼스트 슬램덩크",
            postImage:
              "https://an2-img.amz.wtchn.net/image/v2/HaTjW_4v3cZnU9ukZvTSrw.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk1qZ3dlRFF3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpFMk56RTNOalk0TlRjMU1EVTFNamMzTWpVaWZRLncyaWZ6TU1LM2hGUy1GNnhKczlDNzFlYkVuMDZMb2ZyZXdaMWI3SjZxS1k",
            plot: `전국 제패를 꿈꾸는 북산고 농구부 5인방의 꿈과 열정, 멈추지 않는 도전을 그린 영화`,
            genres: "애니메이션/스포츠 ",
          },
          {
            id: "6",
            title: "던전 앤 드래곤: 도적들의 명예",
            postImage:
              "https://an2-img.amz.wtchn.net/image/v2/GwaxY2TYFitPuOQ43snlBQ.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk1qZ3dlRFF3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpFMk56Z3dPVFU0TURJNU56azVNVGMzTWpRaWZRLlB4bWVTdWtHbmtWMWxQVE1ETjlTUGlMV3BDNDNWN24zZDl3akNnWGRZWE0",
            plot: `한때는 명예로운 기사였지만, ‘어떤 사건’ 이후 ‘홀가’, ‘사이먼’, ‘포지’와 함께 도적질을 하게 된 ‘에드긴’. ‘소피나’의 제안으로 ’부활의 서판’을 얻기 위해 ‘코린의 성’에 잠입하지만 포지와 소피나의 배신으로 실패하고 감옥에 갇힌다. 기발한 방법으로 탈옥에 성공한 에드긴과 홀가는 소중한 사람들과 다시 만나고, ‘부활의 서판’도 되찾기 위해 자신만의 팀을 꾸리기 시작하는데… 옛 동료인 소질 없는 소서러 사이먼과 새롭게 합류한 변신 천재 드루이드 '도릭’, 재미 빼고 다 가진 팔라딘 '젠크’까지 어딘가 2% 부족한 오합지졸로 가득한 이 팀, 과연 무사히 모험을 끝마칠 수 있을까?
      
            <가디언즈 오브 갤럭시> 제작진이 선보이는
            매력만점 롤플레잉 액션 어드벤처 무비가 온다!`,
            genres: "액션/모험/판타지",
          },
          {
            id: "7",
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
            id: "8",
            title: "더 퍼스트 슬램덩크",
            postImage:
              "https://an2-img.amz.wtchn.net/image/v2/HaTjW_4v3cZnU9ukZvTSrw.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk1qZ3dlRFF3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpFMk56RTNOalk0TlRjMU1EVTFNamMzTWpVaWZRLncyaWZ6TU1LM2hGUy1GNnhKczlDNzFlYkVuMDZMb2ZyZXdaMWI3SjZxS1k",
            plot: `전국 제패를 꿈꾸는 북산고 농구부 5인방의 꿈과 열정, 멈추지 않는 도전을 그린 영화`,
            genres: "애니메이션/스포츠 ",
          },
          {
            id: "9",
            title: "던전 앤 드래곤: 도적들의 명예",
            postImage:
              "https://an2-img.amz.wtchn.net/image/v2/GwaxY2TYFitPuOQ43snlBQ.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk1qZ3dlRFF3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpFMk56Z3dPVFU0TURJNU56azVNVGMzTWpRaWZRLlB4bWVTdWtHbmtWMWxQVE1ETjlTUGlMV3BDNDNWN24zZDl3akNnWGRZWE0",
            plot: `한때는 명예로운 기사였지만, ‘어떤 사건’ 이후 ‘홀가’, ‘사이먼’, ‘포지’와 함께 도적질을 하게 된 ‘에드긴’. ‘소피나’의 제안으로 ’부활의 서판’을 얻기 위해 ‘코린의 성’에 잠입하지만 포지와 소피나의 배신으로 실패하고 감옥에 갇힌다. 기발한 방법으로 탈옥에 성공한 에드긴과 홀가는 소중한 사람들과 다시 만나고, ‘부활의 서판’도 되찾기 위해 자신만의 팀을 꾸리기 시작하는데… 옛 동료인 소질 없는 소서러 사이먼과 새롭게 합류한 변신 천재 드루이드 '도릭’, 재미 빼고 다 가진 팔라딘 '젠크’까지 어딘가 2% 부족한 오합지졸로 가득한 이 팀, 과연 무사히 모험을 끝마칠 수 있을까?
      
            <가디언즈 오브 갤럭시> 제작진이 선보이는
            매력만점 롤플레잉 액션 어드벤처 무비가 온다!`,
            genres: "액션/모험/판타지",
          },
      ];
    const onGetMovies = async () => {
      //서버에서 데이터를 불러옴.
      const response = await getMovies();
  
      if (response.status === 200) {
        setMovies(response.data.data);
      }
      //console.log(response.data.data);
    };

    useEffect(() => {
        //onGetMovies();
        setMovies(movieListTest);
      }, []);
    return(
        <main className={styles.wrapper}>
            <section className={styles.top10Wrapper}>
                <h1 className={styles.header}>Top 10</h1>
                <div>

                </div>
            </section>
            <section className={styles.rcmdWrapper}> 
                <h1 className={styles.header}>M-archive 영화 추천</h1>
                <Carousel movies={movies}/>
            </section>
            <section className={styles.genreWrapper}>
                <h1 className={styles.header}>장르</h1>
                <div></div>
            </section>
        </main>
    )
}
export default Home;