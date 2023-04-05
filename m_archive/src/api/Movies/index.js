import apiClient from '../apiClient';

//MEMO: 영화 여러개(리스트) page - ? , limit - 한번에 받아오는 영화개수(추측)
export const getMovies = (page,limit,title) => {
  return apiClient.get(`/movies`,{
    params:{
      page,
      limit,
      title,
    }
  });
};

//MEMO: 영화 하나 (상세)
export const getMovie = (id) => {
  return apiClient.get(`/movies/${id}/detail`);
};

//MEMO: top10영화들
export const getTop10Movies = () => {
  return apiClient.get('/movies/top');
};

//NOTE: query는 params에 객체 넣듯이 넣어서 사용
//MEMO: 장르별 영화 가져오기 
export const getGenreMovies = (page, selected) => {
  return apiClient.get(`/movies/genre`, {
    params: {
      page,
      limit: 24,
      genreIds: selected,
    },
  });
};

//MEMO :영화 좋아요 생성! id - 영화id
export const createLike = (id) =>{
  return apiClient.post(`/movies/${id}/like`);
}
//MEMO :영화 좋아요 삭제!! id - 영화id
export const deleteLike = (id) =>{
  return apiClient.delete(`/movies/${id}/like`);
}
export const getLikes = () =>{
  return apiClient.get(`/movies/me/like`);
}

export const countMovies = () => {
  return apiClient.get(`movies/count`);
}