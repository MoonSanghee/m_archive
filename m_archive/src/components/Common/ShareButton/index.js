import React, { memo } from "react";
import { ShareIcon } from "../../../assets/icon";
import styles from "./sharebutton.module.scss";
import { CopyToClipboard} from "react-copy-to-clipboard";
import swal from "sweetalert2";

const ShareButton = () => {
    const currentUrl = window.location.href;

    const onShareBtnClick = () => {
        // swal.fire("복사완료", "링크를 클립보드에 복사했습니다.", "success,", "showConfirmButton: false", "timer: 1500")
        // swal.fire({
        //     position:"bottom-start",
        //     icon:"success",
        //     iconColor:"#89CFFD",
        //     text:"링크를 클립보드에 복사했습니다.",
        //     showConfirmButton: false,
        //     timer: 2000,
        //     width: 160,
        //     background: "#E4E3E3",
        //     color: "#000000",
        // })
        swal.fire({
            text:"링크를 클립보드에 복사했습니다.",
            position: "bottom-left",
            timer: 2000,
            showConfirmButton: false,
            background: "#E4E3E3",
            color: "#000000"
        })
    }
    
    return (
        <main>
            <section className={styles.wrapper} onClick={onShareBtnClick}>
                <CopyToClipboard text={currentUrl}>
                <ShareIcon/>
                </CopyToClipboard>
            </section>
        </main>
    )
};

export default memo(ShareButton);