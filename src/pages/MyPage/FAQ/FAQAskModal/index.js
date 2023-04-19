import { useState } from 'react';
import { Button } from '../../../../components/Common';
import styles from './faqAskModal.module.scss';
import { createFaq } from '../../../../api/FAQ';
import { useMe } from '../../../../hooks';


const FAQAskModal = ({ onClose }) => {

  const me = useMe();
  const [form, setForm] = useState({
    title: '',
    content: '',
  });


  const handleSubmit = async (event) => {
    event.preventDefault();
    const faqData = {
      content: form.content,
      title: form.title,
    };
    console.log(faqData);
    if (faqData.content === '' || faqData.title === '') {
      //경고메세지
      alert('제목과 내용을 입력해주세요.');
      return;
    }
    const response = await createFaq(faqData);
    if (response.status === 201) {
      alert('문의성공');
 
    } else {
      alert('문의실패');
    }
 
  };

  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <section>
      <h2 className={styles.faqAskTitle}>문의하기</h2>
      <form onSubmit={handleSubmit}>
        <label className={styles.inputGroup}>
          이름
          <input type="text" name="name" value={me?.name} />
        </label>
        <label className={styles.inputGroup}>
          제목
          <input
            type="text"
            name="title"
            value={form?.title}
            onChange={onChange}
          />
        </label>
        <label className={styles.inputGroup}>
          내용
          <textarea
            id="content"
            name="content"
            value={form?.content}
            onChange={onChange}
          ></textarea>
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
};
export default FAQAskModal;
