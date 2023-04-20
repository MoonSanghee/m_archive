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

export const getFAQsMe = (page, limit) => {
  return apiClient.get('/faqs/me', {
    params: {
      page,
      limit,
    },
  });
};

//NOTE: id => 답변의 id
export const patchFaq = (id, body) => {
  return apiClient.patch(`/faqs/comments/${id}`, body);
};

//NOTE: id => faq의 id
//NOTE: body => { content : "string" }
export const createFaqAdmin = (id, body) => {
  return apiClient.post(`/faqs/${id}/comments`, body);
};

/*export const getFaqDetail = (id)=>{
  return apiClient.get(`/faqs/${id}/detail`);
}*/