import cx from 'classnames';
import React, { memo } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import swal from 'sweetalert2';
import { ShareIcon } from '../../../assets/icon';
import styles from './sharebutton.module.scss';

const ShareButton = ({ label, className, url }) => {
  //NOTE: host url도 같이 복사
  const currentUrl = url ? url : window.location.href;

  const onShareBtnClick = () => {
    //NOTE: position 으로 조절하거나, showClass로 조절
    swal.fire({
      text: '링크를 클립보드에 복사했습니다.',
      position: 'bottom-left',
      showClass: {
        popup: styles.popup,
      },
      timer: 1000,
      showConfirmButton: false,
      padding: '0',
      width: 320,
    });
  };

  return (
    <section className={cx(styles.wrapper, className)}>
      <CopyToClipboard text={currentUrl}>
        <span className={styles.label} onClick={onShareBtnClick}>
          <ShareIcon />
          {label ? `${label}` : ''}
        </span>
      </CopyToClipboard>
    </section>
  );
};

export default memo(ShareButton);
