import React, { useEffect, useState } from "react";
import { BlockIcon, LikeBlackIcon, LikeRedIcon } from "../../../assets/icon";
import styles from "./card.module.scss";
import cx from "classnames";

const Card = ({ item ,onClick,type,idx}) => {
  /*const navigate = useNavigate();
  const onNavigateDetail = (id) => {
     navigate(`/movie/${id}`);
  }*/

  const [isClicked, setIsClicked] = useState(false);
  const [genres,setGenres] = useState("");

  const onChangeBtn = (e) => {
    setIsClicked(!isClicked);
  };
  useEffect(()=>{
    let genre = item.genres.reduce((acc,cur) => acc + cur.name+'/',"");
    genre = genre.substring(0,genre.length-1);
    setGenres(genre);
  },[]);

  return (
    <div
      className={cx(styles.cardWrapper,{[styles.top10First]:type==="top10" && idx===0 })}>
      <div className={styles.card_inner}>
        <div className={styles.card_front}  >
          <img src={item?.postImage} alt={item?.title} />
        </div>
        <div className={styles.card_back}  >
          <div className={styles.card_content}  onClick={onClick} /*onClick={() => showDetail(item._id)}*/>
            <h2 className={styles.title}>{item?.title}</h2>
              <h3>{genres}</h3> 
            <p>{item?.plot}</p>
          </div>
          <div className={styles.menu}>
            {isClicked === true ? (
              <LikeRedIcon
                onClick={onChangeBtn}
                className={`${styles.icon} ${styles.heart}`}
              />
            ) : (
              <LikeBlackIcon onClick={onChangeBtn} className={styles.icon} />
            )}
            <BlockIcon className={styles.icon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;