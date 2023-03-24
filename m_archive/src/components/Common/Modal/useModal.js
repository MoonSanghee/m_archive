import { useState, useCallback } from 'react';

const OPTION = {
    show: false,
    title: "",
    onSubmit: () => {},
    onClose: () => {},
    element: null
}

const useModal = () => {
    const [modalOption, setModalOption] = useState(OPTION)

    const showModal = useCallback((show, title, onSubmitCallback, onCloseCallback, element) => {
        setModalOption(prev => ({
          ...prev, 
          show,
          title,
          onSubmit: () => {
            if (onSubmitCallback) onSubmitCallback()
            setModalOption(prev => ({ ...prev, show: false }))
          },
          onClose: () => {
            if (onCloseCallback) onCloseCallback()
            setModalOption(prev => ({ ...prev, show: false }))
          },
          element
        }))
      }, [modalOption])


    return [modalOption, showModal]
}

export default useModal;