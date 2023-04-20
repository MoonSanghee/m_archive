import React from 'react';
import cx from 'classnames';
import styles from './modal.module.scss';
import { CloseIcon } from '../../../assets/icon';
//TODO: 재사용 가능한 모달 컴포넌트 만들기
/**
 * 모달을 사용할 페이지에 밑에 옵션을 항상 넣어주쇼
    const OPTION = {
    show: false, // 모달을 키고 끄는 옵션 
    title: "", // 모달의 문구 
    onSubmit: () => {}, // 모달을 킬 때마다 사용할 콜백 함수
    onClose: () => {}, // 모달을 끌 때마다 사용할 콜백 함수
    element: null // 모달마다 넣고 싶은 추가 컴포넌트 자리
    }

    const [modalOption, setModalOption] = useState(OPTION)
 */

const Modal = ({ modalOption, modalSize, className, }) => {
  return (
    <main>
      {modalOption?.show && (
        <>
          <div
            className={cx(styles.overlay)}
            onClick={() => modalOption.onClose()}
          />
          <section className={cx(styles.wrapper)}>
          
            <div
              className={cx(styles.modalWrapper, styles[modalSize], className)}
            >
              <div className={styles.closeButtonWrapper}>
                <CloseIcon onClick={() => modalOption.onClose()} />
              </div>

              <div className={styles.contentWrapper}>
                {modalOption?.element}
              </div>
            </div>
          </section>
          
        </>
      )}
    </main>
  );
};
export default Modal;

{
  /**
                             *  <h2>{modalOption?.title}</h2>
                            <div>
                                <button onClick={() => modalOption.onSubmit()}>확인</button>                         
                                <button onClick={() => modalOption.onClose()}>닫기</button>
                            </div>
                             
                    
                             */
}
