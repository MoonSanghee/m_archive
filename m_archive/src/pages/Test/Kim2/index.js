import React, { useState } from "react";
import icon from "../../../assets/icon"

// 프로필 아이콘 교체 기능 테스트 중 
function Kim2({ src, alt }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSrc, setNewSrc] = useState(src);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleIconChange = (newSrc) => {
    setNewSrc(newSrc);
    setIsModalOpen(false);
  };

  return (
    <div>
      <img src={newSrc} alt={alt} onClick={handleModalOpen} />

      {isModalOpen && (
        <div>
          <div>Choose a new profile icon:</div>
          <div>
            <img
              src= "image.png"
              alt="icon_1"
              onClick={() => handleIconChange("url_to_icon_1")}
            />
            <img
              src="url_to_icon_2"
              alt="icon_2"
              onClick={() => handleIconChange("url_to_icon_2")}
            />
            <img
              src="url_to_icon_3"
              alt="icon_3"
              onClick={() => handleIconChange("url_to_icon_3")}
            />
          </div>
          <button onClick={handleModalClose}>Cancel</button>
        </div>
      )}
    </div>
  );
}
export default Kim2;