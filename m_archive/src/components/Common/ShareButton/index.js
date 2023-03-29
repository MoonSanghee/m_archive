import React, { memo } from "react";
import { ShareIcon } from "../../../assets/icon";
import styles from "./sharebutton.module.scss";
import { CopyToClipboard } from "react-copy-to-clipboard";
import swal from "sweetalert2";

const ShareButton = () => {
  const currentUrl = window.location.href;

  const onShareBtnClick = () => {
    //NOTE: position 으로 조절하거나, showClass로 조절
    swal.fire({
      text: "링크를 클립보드에 복사했습니다.",
      position: "bottom-left",
      showClass: {
        popup: styles.popup,
      },
      timer: 1000,
      showConfirmButton: false,
      padding: "0",
      width: 320
    });
  };

  return (
      <section className={styles.wrapper} onClick={onShareBtnClick}>
        <CopyToClipboard text={currentUrl}>
          <ShareIcon /> 
        </CopyToClipboard>
        <span className={styles.label}>공유</span>
      </section>
  );
};

export default memo(ShareButton);
