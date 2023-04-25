import { useState, useCallback } from 'react';

const OPTION = {
  show: false,
  title: '',
  onSubmit: () => {},
  onClose: () => {},
  element: null,
};

//NOTE: Recoil + react-portal => recoil을 통해서 모달의 상태를 관리
const useModal = () => {
  const [modalOption, setModalOption] = useState(OPTION);

  const showModal = useCallback(
    (show, title, onSubmitCallback, onCloseCallback, element) => {
      setModalOption((prev) => ({
        ...prev,
        show,
        title,
        onSubmit: () => {
          if (onSubmitCallback) onSubmitCallback();
          setModalOption((prev) => ({ ...prev, show: false }));
        },
        onClose: () => {
          if (onCloseCallback) onCloseCallback();
          setModalOption((prev) => ({ ...prev, show: false }));
        },
        element,
      }));
    },
    [modalOption],
  );
  //NOTE: onClose와 같은 함수는 state에 잘 넣지 않습니다.
  const onClose = (callback) => {
    if (typeof callback === 'function') callback();
    setModalOption((prev) => ({ ...prev, show: false }));
  };
  return [modalOption, showModal, onClose];
};

export default useModal;
