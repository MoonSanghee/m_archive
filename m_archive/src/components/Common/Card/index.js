import React, { useState } from "react";
import { BlockIcon, LikeBlackIcon, LikeRedIcon } from "../../../assets/icon";
import styles from "./card.module.scss";

const Card = ({ item }) => {
  // const navigate = useNavigate();
  // const showDetail = (id) => {
  //   navigate(`/movie/${id}`);
  // };

  const [isClicked, setIsClicked] = useState(false);

  const onChangeBtn = (e) => {
    setIsClicked(!isClicked);
  };

  return (
    <div
      className={styles.cardWrapper}>
      <div className={styles.card_inner}>
        <div className={styles.card_front}>
          <img src={item?.postImage} alt={item?.title} />
        </div>
        <div className={styles.card_back}>
          <div className={styles.card_content}  /*onClick={() => showDetail(item._id)}*/>
            <h2 className={styles.title}>{item?.title}</h2>
            <h3>{item?.genres}</h3>
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