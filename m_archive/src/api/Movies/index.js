import apiClient from '../apiClient';

//MEMO: 영화 여러개(리스트) page - ? , limit - 한번에 받아오는 영화개수(추측)
export const getMovies = (page) => {
  return apiClient.get(`/movies?page=${page}&limit=10000`);
};

//MEMO: 영화 하나 (상세)
export const getMovie = (id) => {
  return apiClient.get(`/movies/${id}/detail`);
};

export const getTop10Movies = () => {
  return apiClient.get('/movies/top');
};

//NOTE: query는 params에 객체 넣듯이 넣어서 사용
export const getGenreMovies = (page, selected) => {
  return apiClient.get(`/movies/genre`, {
    params: {
      page,
      limit: 24,
      genreIds: selected,
    },
  });
};

/*
export const searchProduct = (params) => {
  return apiClient.get("/products/search", {
    params,
  });
};

export const createProduct = (body) => {
  return apiClient.post("/products/add", body);
};
*/
