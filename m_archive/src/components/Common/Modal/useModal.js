import { useState, useCallback } from "react";

const OPTION = {
  show: false,
  title: "",
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
    [modalOption]
  );

  return [modalOption, showModal];
};

export default useModal;
