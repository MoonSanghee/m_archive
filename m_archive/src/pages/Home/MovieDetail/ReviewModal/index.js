import { useEffect, useState } from "react";
import styles from "./reviewModal.module.scss";
import { Button } from "../../../../components/Common";
import cx from "classnames";
import { createReview, deleteReview, modifyReview } from "../../../../api/Reviews";

const ReviewModal = ({ title, isEmptyReview,movieId,myReview, onClose }) => {
  const [content, setContent] = useState("");
  const [isModified, setIsModified] = useState(false);
  //const [isDeleted, setIsDeleted] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefalut();

    const btn_type = e.currentTarget.id;
    if (btn_type === "save") {
      if (isModified) {
      //리뷰 수정  
        const reviewData = {
          content:content,
        };
        const response = await modifyReview(myReview.id,reviewData);
        if(response.status === 200 ){
          alert("리뷰가 수정되었습니다.")
        }else{
          alert("리뷰수정 오류");
        }
      } else {
        //리뷰 생성
        const reviewData = {
          content:content,
          score:0,
          //지금은 null값이 안돼서
        };
        const response = await createReview(movieId,reviewData);
        if(response.status === 200 ){
          alert("리뷰가 수정되었습니다.")
        }else{
          alert("리뷰생성 오류");
        }
      }
    } else {
      //리뷰삭제
      const response = await deleteReview(myReview.id);
      if(response.status === 200 ){
        alert("리뷰가 삭제되었습니다.")
      }else{
        alert("리뷰삭제 오류");
      }
    }
    onClose();
  };
 
  const onChange = (e) => {
    const { value } = e.currentTarget;
    setContent(value);
  };

  useEffect(() => {
    if (!isEmptyReview) {
      setContent(myReview.content);
      setIsModified(true);
    }
    console.log(title);
  }, []);

  return (
    <section className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <h1>{title}</h1>
      </div>
      <form id="reviewForm" onSubmit={onSubmit} className={styles.formWrapper}>
        <textarea
          //type="text"
          name="content"
          className={cx(styles.reviewContent)}
          value={content}
          onChange={onChange}
        />

        {/* //NOTE: position fixed */}
        <div className={styles.btnWrapper}>
        <Button id="save" color={"secondary"} type="submit" form="reviewForm">
            {!isModified ? "저장" : "수정"}
          </Button>
          {isModified && (
            <Button id="delete" color={"gray"} type="submit" form="reviewForm" >
              삭제
            </Button>
          )}

          

        </div>
      </form>
    </section>
  );
};

export default ReviewModal;
