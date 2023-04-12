import cx from 'classnames';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { createComment, deleteReviewLike,createReviewLike, deleteComment, getReviewDetail } from '../../../../../api/Reviews';
import {
  CommentIcon,
  CommentLikeIcon,
} from '../../../../../assets/icon';
import {
  Button,
  ShareButton,
  StarRate,
  ProfileIcon
} from '../../../../../components/Common';
import { useMe } from '../../../../../hooks';
import styles from './reviewDetailModal.module.scss';
import { useLocation } from 'react-router-dom';
import { getTokens } from '../../../../../utils';
import { useMount } from 'react-use';


const diff = (date) => {
  const now = dayjs();
  return `${now.diff(date, 'day')}일 전`;
};
const checkResponse = (status, text, code) => {
  if (status === code) {
    //alert(`댓글이 ${text}되었습니다.`);
  } else {
    alert(`${text} 오류`);
  }
};

const ReviewDetailModal = ({ thisReview,movieId }) => {
  const me = useMe();
  const location = useLocation();
  const [comment, setComment] = useState('');
  const [review, setReview] = useState({});
  const [isLiked, setIsLiked] = useState(false);
const isExists = (attr, item) => {
    const result = item?.['user']?.[attr];
    if (!!result) return item['user'][attr];
    else return false;
};


const isMyComment = (item) => {
    //해당 영화리뷰의 코멘트(댓글) 목록중 내가 쓴 목록이 있으면 commentId 리턴
    //리뷰쓴 userId와 내 userId 비교 -> 내 리뷰가 있으면 내리뷰리턴
    if (!me) return;
    let result = item?.user?.id === me?.id ? true : false;
    return result;
  };

  const onChange = (e) => {
    const { value } = e.currentTarget;
    setComment(value);
  };

    const onSubmit = async (e) => {
    e.preventDefault();
    const commentData = {
      content: comment,
    };
    const response = await createComment(review.id, commentData);
    checkResponse(response.status, '댓글 생성', 201);
    onGetReviewDetail(review.id);
    setComment("");
  };

  const onDelete = async (id) =>{
    const response = await deleteComment(id);
    checkResponse(response.status, '댓글 삭제',204);
    onGetReviewDetail(review.id);
  }

  const onClickReviewLike = async (e) =>{
    e.preventDefault();
    //console.log(review);
    if(!isLiked){
        const response = await createReviewLike(review.id);
        checkResponse(response.status,'좋아요 생성',204);
        onGetReviewDetail(review.id);
    }
    else{
        const response = await deleteReviewLike(review.id);
        checkResponse(response.status,'좋아요 삭제',204);
        onGetReviewDetail(review.id);
    }
  }


  const onGetReviewDetail = async () => {

    const response = await getReviewDetail(thisReview.id);
    if (response.status === 200) {
        const item = { ...response.data };
        setReview(item);
    }
  }

  useEffect(()=>{
    setIsLiked(review.isLiked);
  },[review]);
  useMount(()=>{
    onGetReviewDetail();
  })

  return (
    <section className={styles.wrapper}>
      <div className={cx(styles.reviewWrapper)}>
        <div className={styles.infoWrapper}>
          <span className={styles.profileIcon}>
            <ProfileIcon user={review?.user}/>
          </span>
          <div className={styles.rateNicknameWrapper}>
            <div className={styles.scoreWrapper}>
              <StarRate
                //key={`starRate`}
                className={styles.score}
                //id={`STR-Detail-${review?.id}`}
                item={review}
              />
            </div>
            <p className={styles.nickname}>
              <span>
                {!review
                  ? 'none'
                  : isExists('nickname', review) || isExists('name', review)}
              </span>
              <span> / 칭호</span>
            </p>
          </div>
        </div>
        <div className={styles.contentWrapper}>
          <p className={styles.clientcomment}>{review?.content}</p>
        </div>
        <div className={styles.detailsWrapper}>
          <span className={styles.functionsWrapper}>
            <CommentLikeIcon />
            {review?.likeCount}
            <CommentIcon />
            {review?.comments?.length}
          </span>
          <span className={styles.dateWrapper}>
            {`${dayjs(review?.updatedAt).format('YYYY-MM-DD')}에 수정됨`}
          </span>
        </div>
      </div>
      <div className={styles.functionWrapper}>
        <span className={cx(styles.likeButton,{[styles.isLiked]:isLiked})}
        onClick={onClickReviewLike}>
          <CommentLikeIcon/>
          {'좋아요'}
        </span>
        <span>
          <CommentIcon />
          {'댓글'}
        </span>
        <span>
          <ShareButton label="공유" className={styles.shareButton} url={location.pathname}/>
        </span>
      </div>
      <div className={styles.commentsWrapper}>
        <ul className={styles.ul}>
          {review &&
            review.comments?.map((item) => {
              return (
                <li key={`${item.id}`} className={styles.li}>
                  <ProfileIcon user={item.user} className={styles.profileIcon}/>
                  <div>
                    <span>
                      {isExists('nickname',item) || isExists('name',item) }
                    </span>
                    <span className={styles.comment}>{item.content}</span>
                  </div>
                  <p>
                    {isMyComment(item) ? 
                        (<span>
                            <Button
                            type="button"
                            width={'small'}
                            color="secondary"
                            onClick={()=>{onDelete(item?.id)}}
                            >
                                삭제
                            </Button> 
                      </span>):
                        (<span> {diff(item?.updatedAt)}</span> )
                        }
                    
                  </p>
                </li>
              );
            })}
        </ul>
  
      </div>
      <li className={cx(styles.li, styles.me)}>
          <ProfileIcon user={me} className={styles.profileIcon}/>
          <div>
            <span>{me?.nickname || me?.name}</span>
            <span className={styles.comment}>
              <form
                id="commentForm"
                className={styles.loginForm}
                onSubmit={onSubmit}
              >
                <input
                  onChange={onChange}
                  name="comment"
                  value={comment}
                  type="text"
                  size="140"
                  className={styles.commentInput}
                  placeholder="댓글을 입력하세요"
                />
              </form>
            </span>
          </div>
          <p className={styles.button}>
            <Button type="submit" width={'small'} form="commentForm" >
              확인
            </Button>
          </p>
        </li>
    </section>
  );
};

export default ReviewDetailModal;
