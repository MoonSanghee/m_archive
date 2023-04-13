import { Button } from "../../../../components/Common";
import styles from "../faq.module.scss"

const FAQModal = ({type,onClose}) =>{
    if(type==="questions"){
        return(
            
            <section>
                <h2>문의 내역</h2>
                {/* 문의 내역을 나열하는 컴포넌트 추가 */}
            </section>
        )
    }
    else{
        return(
            
            <section>
                <h2>문의하기</h2>
        <form>
          <div className={styles.inputGroup}>
            <label htmlFor="name">이름</label>
            <input type="text" id="name" name="name" />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email">이메일</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="question">질문</label>
            <textarea id="question" name="question"></textarea>
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit">제출</button>
            <button type="button" onClick={onClose}>
              닫기
            </button>
          </div>
          </form>
            </section>
        )
    }
}
export default FAQModal;