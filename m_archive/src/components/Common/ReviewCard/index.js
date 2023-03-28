import React from "react";
import styles from "./reviewcard.module.scss";
import { ProfileIcon } from "../../../assets/icon";

function ReviewCard() {
  return (
    <section className={styles.testimonials}>
      <container className={styles.testimonialBoxContainer}>
        <box className={styles.testimonialBox}>
         {/* //NOTE: 1) 시멘틱 요소를 사용하면 좋다. */}
          {/* //NOTE: 2) div를 사용한 depth가 너무 깊다. */}
          <div className={styles.boxTop}>
           <div className={styles.profile}>
            <div className={styles.profileimg}>
              <ProfileIcon />
            </div>
            <div className={styles.nameUser}>
              <strong>요것은 닉네임</strong>
              <span>요것은 칭호?</span>
            </div>
          </div>
          <p className={styles.review}>
            {/* 별점 */}
            여기가 별점 위치?
          </p>
        </div>
        <p className={styles.clientcomment}>요것은 테스트여</p>
      </box>
    </container>
  </section>

  );

}

export default ReviewCard; 