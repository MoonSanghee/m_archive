import React,{useState} from "react";
import styles from "./reviewcard.module.scss";
import { ProfileIcon,EyeIcon,EyeBlindIcon } from "../../../assets/icon";
import cx from "classnames";
import StarRate from "../StarRate";

const ReviewCard = (item,...props) => {
  const [blind,setBlind] = useState(false);
  const onClickBlind = () =>{
    setBlind(!blind);
  }
  const isExists = (attr) =>{
    let result = item["item"]["user"][attr]=== null || item["item"]["user"][attr] === undefined;
    if(!result) return result;
    else return "none";
  }
  return (
    <section className={styles.wrapper}  {...props}>
      <div className={cx({[styles.blind]:blind===true})}></div>
      <div className={cx(styles.cardWrapper, )}>
          <div className={styles.infoWrapper}>
            <span className={styles.profileIcon}>
              <ProfileIcon />
              </span>
            <div className={styles.rateNicknameWrapper}>
              <div className={styles.scoreWrapper}>
                <StarRate  
                  //key={`starRate`}
                  className={styles.score}
                  id={`SR`}
                  item={item?.item}/>
              </div>
              <p className={styles.nickname}>
                <span>{isExists("nickname") }</span>
                <span> / 칭호</span></p>
              
            </div>
            <span className={styles.eyeIcon}>
              {!blind ? <EyeIcon onClick={onClickBlind}/> : <EyeBlindIcon onClick={onClickBlind}/> }
            </span>
          </div>
          <div className={styles.contentWrapper}>
          {!blind ? 
          <p className={styles.clientcomment}>{item?.item.content}</p> : 
          <p className={styles.clientcomment}>{"블라인드 처리된 리뷰입니다."}</p>
          }
          </div>
          <div className={styles.detailsWrapper}>
              <span className={styles.functionsWrapper}>좋아요/댓글</span>
              <span className={styles.dateWrapper}>날짜</span>
          </div>
      </div>
    </section>
  );

}

export default ReviewCard; 

 {/* //NOTE: 1) 시멘틱 요소를 사용하면 좋다. */
/* //NOTE: 2) div를 사용한 depth가 너무 깊다. */
    /* 해당유저 아이콘넣기 */
      /* 별점 */}
   
   