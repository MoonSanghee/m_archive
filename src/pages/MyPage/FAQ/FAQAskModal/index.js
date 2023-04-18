import { useState } from 'react';
import { Button } from '../../../../components/Common';
import styles from './faqAskModal.module.scss';
import { createFaq } from '../../../../api/FAQ';
import { useMe } from '../../../../hooks';

//NOTE: "문의하기 모달" 과 "문의내역 모달" 2개는 구분을해서 만드는게 좋다.
//NOTE: scss파일은 js파일 하나 당 1개 => 유지보수가 쉬워짐
const FAQAskModal = ({  onClose }) => {
  //NOTE: questions => faqs
  const me = useMe();
  const [form, setForm] = useState({
    title: '',
    content: '',
 });

 
  

  //NOTE: 문의 생성

  const handleQuestionClick = (index) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions[index].isExpanded = !newQuestions[index].isExpanded;
      return newQuestions;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //NOTE: submitted 상태 관리보다는 alert 띄우고 확인 누르면 모달이 꺼지도록
    // setIsSubmitted(true);
    const faqData = {
      content: form.content,
      title:form.title,
    }
    console.log(faqData);
    if(faqData.content ==='' || faqData.title ==='' ){
      //경고메세지 
      alert("제목과 내용을 입력해주세요.")
      return;
    }
    const response = await createFaq(faqData);
    if(response.status ===201){
      alert("문의성공");
      onClose();
      //여기는 임시
    }else{
      alert("문의실패");
    }
    onClose();
  };

  const onChange = (e)=>{
    const {name,value} = e.currentTarget;
    setForm({
      ...form,
      [name]:value
    })
    
  }

  

    
    return (
      <section>
      <h2 className={styles.faqAskTitle}>문의하기</h2>
        <form onSubmit={handleSubmit}>
          <label className={styles.inputGroup}>
            이름
            <input type="text" name="name" value={me?.name} />
          </label>
            <label className={styles.inputGroup} >
            제목
            <input type="text" name="title"  value={form?.title} onChange={onChange}/>
            </label>
            <label className={styles.inputGroup}>
              내용
            <textarea id="content" name="content" value={form?.content} onChange={onChange}></textarea>
            </label>
          <div className={styles.buttonGroup}>
            <Button type="submit">제출</Button>
            <Button type="button" onClick={onClose}>
              닫기
            </Button>
          </div>
        </form>
    </section>
     
    );
  }
export default FAQAskModal;
