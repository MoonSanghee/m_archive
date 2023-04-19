import React, { useEffect, useState } from 'react';
import { Button, Input } from '../../../components';
import styles from './editModal.module.scss';
import cx from 'classnames';
import { patchUser } from '../../../api/Users';
import { patchReview, modifyReview } from '../../../api/Reviews';
import { createFaqAdmin, getFAQs, patchFaq } from '../../../api/FAQ';
const EditModal = ({ item, type, onClose }) => {
  // useState변수- 리뷰, 유저-  form 2;
  // onSubmitReview 수정 api 성공 ->  onClose();
  //

  const [reviewForm, setReviewForm] = useState({
    score: item?.score,
    content: item?.content,
  });
  const [userForm, setUserForm] = useState({
    email: item?.email,
    // password:item?.password,
    name: item?.name,
    nickname: item?.nickname,
    description: item?.description,
  });

  const [faqForm, setFaqForm] = useState({
    title: item?.title,
    content: item?.content,
    comments: '',
  });

  const onSubmitUser = async (e) => {
    e.preventDefault();
    await patchUser(item.id, userForm);
    onClose();
  };

  const onSubmitReview = async (e) => {
    e.preventDefault();
    await patchReview(item.id, reviewForm);
    onClose();
  };

  const onSubmitFaq = async (e) => {
    e.preventDefault();

    //NOTE: 답변이 없는 경우
    // if (item.faqComments.length === 0) {
      if (!item.faqComment) {   
      await createFaqAdmin(item.id, {
        content: faqForm.comments,
      });
      alert("답변을 성공적으로 등록하였습니다.");
    } else {
      //NOTE: (답변이 여러개 가능한 경우) 답변이 있는 경우 => id => item.faqComments[0].id
      //NOTE: (답변이 하나만 가능한 경우) 답변이 있는 경우 => id => item.faqComment.id
      await patchFaq(item.faqComment.id, {
        content: faqForm.comments,
      });
      alert("답변을 성공적으로 수정하였습니다.");
    }
    onClose();
  };

  const onChangeReview = (e) => {
    const { name, value } = e.currentTarget;
    setReviewForm({
      ...reviewForm,
      [name]: value,
    });
  };
  const onChangeUser = (e) => {
    const { name, value } = e.currentTarget;
    setUserForm({
      ...userForm,
      [name]: value,
    });
  };
  const onChangeFaq = (e) => {
    const { name, value } = e.currentTarget;
    setFaqForm({
      ...faqForm,
      [name]: value,
    });
  };

  useEffect(() => {
    //NOTE: 답변이 있는 경우 default 값을 설정
    if (type === 'faq' && item.faqComment) {
      //NOTE: 현재 상태 -> item.faqComments.length !== 0
      //NOTE: 수정 -> item.faqComment
      setFaqForm({
        ...faqForm,
        // comments: item.faqComments[0].content,
        comments: item.faqComment.content,
      });
    }
  }, [type, item]);

  if (type === 'review') {
    return (
      <section className={styles.reviewWrapper}>
        <Input
          name="score"
          type="number"
          className={cx(styles.score)}
          label={'별점 : '}
          value={reviewForm?.score}
          onChange={onChangeReview}
        />
        <div className={styles.review}>
          <label for="review">
            <p>리뷰 :</p>{' '}
          </label>
          <textarea
            name="content"
            id="review"
            value={reviewForm?.content}
            onChange={onChangeReview}
          />
        </div>
        <div className={styles.button}>
          <Button
            children="저장"
            width={'short'}
            color={'secondary'}
            onClick={onSubmitReview}
          />
        </div>
      </section>
    );
  } else if (type === 'user') {
    return (
      <section className={styles.userWrapper}>
        <Input
          name="email"
          className={styles.userInput}
          label={'이메일 : '}
          value={userForm?.email}
          onChange={onChangeUser}
        />
        <Input
          name="password"
          className={styles.userInput}
          label={'비밀번호 : '}
          value={userForm?.password}
          onChange={onChangeUser}
        />
        <Input
          name="name"
          className={styles.userInput}
          label={'이름 : '}
          value={userForm?.name}
          onChange={onChangeUser}
        />
        <Input
          name="nickname"
          className={styles.userInput}
          label={'닉네임 : '}
          value={userForm?.nickname}
          onChange={onChangeUser}
        />
        {/* <Input name="description" className={styles.userInput} label={"소개글 : "} value={userForm?.description} onChange={onChangeUser}/> */}
        <div className={styles.user}>
          <label for="user">
            <p>소개글 :</p>{' '}
          </label>
          <textarea
            name="description"
            id="user"
            value={userForm?.description}
            onChange={onChangeUser}
          />
        </div>
        <div className={styles.button}>
          <Button
            children="저장"
            width={'short'}
            color={'secondary'}
            onClick={onSubmitUser}
          />
        </div>
      </section>
    );
  } else if (type === 'faq') {
    return (
      <section className={styles.faqWrapper}>
        <Input
          name="title"
          className={styles.faqInput}
          label={'제목 : '}
          value={faqForm?.title}
        />
        <Input
          name="content"
          className={styles.faqInput}
          label={'문의내용 :'}
          value={faqForm?.content}
        />
        <div className={styles.faq}>
          <label for="faq">
            <p>답변하기 :</p>{' '}
          </label>
          <textarea
            name="comments"
            id="faq"
            value={faqForm?.comments}
            onChange={onChangeFaq}
          />
        </div>
        <div className={styles.button}>
          <Button
            children="답변하기"
            width={'short'}
            color={'secondary'}
            onClick={onSubmitFaq}
          />
        </div>
      </section>
    );
  }
};
export default EditModal;
