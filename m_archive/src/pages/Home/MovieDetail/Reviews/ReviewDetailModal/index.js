import { useEffect, useState } from 'react';
import { useEffectOnce, useMount, useUnmount } from 'react-use';
import styles from './reviewDetailModal.module.scss';
import cx from 'classnames';
import { ProfileIcon,CommentIcon,CommentLikeIcon } from '../../../../../assets/icon';
import { StarRate } from '../../../../../components/Common';
import dayjs from "dayjs";
import {ShareButton} from '../../../../../components/Common';
import { useMe } from '../../../../../hooks';
import {Button} from '../../../../../components/Common';
import { createComment,modifyComment,deleteComment,getReviewDetail} from '../../../../../api/Reviews';


const diff = (date) =>{
    const now = dayjs();
    return `${now.diff(date, "day")}일 전`;
}
const checkResponse = (status, text, code) => {
    if (status === code) {
      alert(`댓글이 ${text}되었습니다.`);
    } else {
      alert(`댓글${text} 오류`);
    }
  };

const ReviewDetailModal = ({thisReview}) =>{
    const me = useMe();
    const [comment,setComment] = useState("");
    const [review,setReview] = useState({});
    
    const isExists = (attr,item) => {
        console.log(item);
        const result = item['user'][attr];
        //있으면 값, 없으면 false??
        if (!!result) return item['user'][attr];
        else return false;
    };
 
      const isMyComment = (item) => {
        //해당 영화리뷰의 코멘트(댓글) 목록중 내가 쓴 목록이 있으면 commentId 리턴
        //리뷰쓴 userId와 내 userId 비교 -> 내 리뷰가 있으면 내리뷰리턴

        if(!me) return;
        let result = item.user.id === me?.id ? true : false;
        return result;
      };
    const onChange = (e) => {
        const { value } = e.currentTarget;
        setComment(value);
    };
    const onSubmit = async (e)=>{
        e.preventDefault();
        const commentData = {
            content:comment,
        }
        const response = await createComment(review.id,commentData);
        checkResponse(response.status,"생성",201);
        onGetReviewDetail(review.id);
    }
    const onGetReviewDetail = async (id)=>{
        const response = await getReviewDetail(id);
        if(response.status === 200){
            const item = {...response.data.data}
            setReview(item);
            console.log(review);
        }
    }
    useEffect(()=>{
        setReview(thisReview);
        console.log(review);
        //onGetReviewDetail(reviewId);
        
    },[]);
    return (
        <section className={styles.wrapper}>
            <div className={styles.reviewWrapper}>
                <div className={styles.infoWrapper}>
                    <span className={styles.profileIcon}>
                        <ProfileIcon />
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
                        <span>{ !review ? "none": (isExists("nickname",review) || isExists('name',review))  }
                        </span>
                        <span> / 칭호</span>
                        </p>
                    </div>  
                </div>
                <div className={styles.contentWrapper}  >
                    <p className={styles.clientcomment}>{review?.content}</p>
                </div>
                <div className={styles.detailsWrapper}>
                    <span className={styles.functionsWrapper}>
                        <CommentLikeIcon/>{review?.likeCount}
                        <CommentIcon/>{/*review?.comments.length*/}
                    </span>
                    <span className={styles.dateWrapper}>
                        {`${dayjs(review?.updatedAt).format("YYYY-MM-DD")}에 수정됨`}
                    </span>
                </div>
            </div>
            <div className={styles.functionWrapper}>
                <span><CommentLikeIcon/>{"좋아요"}</span>
                <span><CommentIcon/>{"댓글"}</span>
                <span><ShareButton label="공유" className={styles.shareButton}/></span>
            </div>
            <div className={styles.commentsWrapper}>
                <ul className={styles.ul}>
                    {review && review.comments.map((item)=>{
                        return(
                            <li key={`${item.id}`} className={styles.li}>
                                <ProfileIcon/>
                                <div >
                                    <span>{
                                    /*isExists('nickname',item) || isExists('name',item) */ 
                                }
                                    </span>
                                    <span className={styles.comment}>{item.content}</span>
                                </div>
                                <p> 
                                    <span>{diff(item?.updatedAt)}</span>
                                    { isMyComment(item) && 
                                    <span>
                                        <Button type="submit" width={"small"} color="secondary" onSubmit={onSubmit}>삭제</Button>
                                    </span> }
                                </p>
                            </li>
                        )
                    })}
                </ul>
                <li className={cx(styles.li, styles.me)}>
                    <ProfileIcon/>
                    <div>
                        <span>{me?.nickname || me?.name}</span>
                        <span className={styles.comment}>
                            <form id="commentForm" className={styles.loginForm} onSubmit={onSubmit}>
                                <input 
                                onChange={onChange}
                                name="comment"
                                value={comment}
                                type="text"
                                size="140" 
                                className={styles.commentInput} 
                                placeholder='댓글을 입력하세요'/>
                            </form>
                            
                        </span>
                    </div>
                    <p className={styles.button}><Button type="submit" width={"small"} onSubmit={onSubmit}>확인</Button></p>
                </li>
            </div>
        </section>
    );
}
export default ReviewDetailModal;