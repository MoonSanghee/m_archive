import apiClient from "../apiClient";
//MEMO: 리뷰 목록 조회
export const getMovieReviews = (id) => {
    return apiClient.get(`/reviews/movie/${id}`);
  };
  
  export const getReviewDetail = (id) => {
    return apiClient.get(`/reviews/${id}/detail`);
  };
  



//Admin - CMS 로그인
//MEMO: 리뷰목록조회
export const getReviews = () => {
    return apiClient.get("/reviews");
  };
  
  //MEMO: 영화 리뷰 수 구하기
  export const getReviewsCount = () => {
    return apiClient.get(`/reviews/count`);
  };