import React, { useState } from 'react';
import { Button, Input } from '../../../components';
import styles from './editModal.module.scss';
import cx from 'classnames';
import { patchUser } from '../../../api/Users';
import { patchReview, modifyReview } from '../../../api/Reviews';
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
  }
};
export default EditModal;
