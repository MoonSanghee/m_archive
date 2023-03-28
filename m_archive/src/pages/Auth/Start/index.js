import React, { useEffect, useState } from "react";
import styles from "./start.module.scss";
import { Button } from "../../../components/Common";
import { useNavigate } from "react-router-dom";

const Start = () => {
  const completedTitle = "어서와요 *^^*";

  const [title, setTitle] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      setTitle((prev) => {
        let result = prev ? prev + completedTitle[count] : completedTitle[0];
        setCount(count + 1);

        if (count >= completedTitle.length) {
          setCount(0);
          setTitle("");
        }
        return result;
      });
    }, 300);

    return () => {
      clearInterval(typingInterval);
    };
  });

  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.header}>M - archive</h1>
      <section className={styles.section}>
        {/* 어서와요 *^^* (타이핑 애니메이션) 투명도 opacity 0.5 적용 */}
        {title}
      </section>
      <Button
        width={"big"}
        type={"submit"}
        form="loginForm"
        onClick={navigateToLogin}
      >
        시작하기
      </Button>
    </main>
  );
};

export default Start;
