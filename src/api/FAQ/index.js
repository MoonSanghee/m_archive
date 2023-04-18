import apiClient from '../apiClient';

export const getFAQs = (page, limit, userName, orderBy, sortBy) => {
  return apiClient.get('/faqs', {
    params: {
      page,
      limit,
      userName, 
      orderBy, 
      sortBy,
    },
  });
};

export const deleteFaqAdmin = (id) => {
  return apiClient.delete(`/faqs/${id}`);
};
export const createFaq = (data) => {
  return apiClient.post('/faqs', data);
};

export const getFAQsMe = (page,limit)=>{
  return apiClient.get("/faqs/me",{
    params:{
      page,
      limit,
    }
  });
}

export const patchFaq = (id, body) => {
  return apiClient.patch(`/faqs/comments/${id}`, body)
}

export const createFaqAdmin = (id) => {
  return apiClient.post(`/faqs/${id}/comments`)
}

