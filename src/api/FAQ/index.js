import apiClient from '../apiClient';

export const getFAQs = (page, limit) => {
  return apiClient.get('/faqs', {
    params: {
      page,
      limit,
    },
  });
};

export const deleteFaqAdmin = (id) => {
  return apiClient.delete(`/faqs/${id}`);
};
export const createFaq = (data) => {
  return apiClient.post('/faqs', data);
};

// FAQcount 요청드리기
export const getFAQsMe = (page,limit)=>{
  return apiClient.get("/faqs/me",{
    params:{
      page,
      limit,
    }
  });
}