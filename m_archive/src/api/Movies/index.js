import apiClient from "../apiClient";

//MEMO: 영화 여러개(리스트) page - ? , limit - 한번에 받아오는 영화개수(추측)
export const getMovies = () => {
  return apiClient.get("movies?page=1&limit=20");
};

//MEMO: 영화 하나 (상세)
export const getMovie = (id) => {
  return apiClient.get(`/movies/${id}/detail`);
};

export const getTop10Movies = () =>{
  return apiClient.get("/movies/top");
}
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