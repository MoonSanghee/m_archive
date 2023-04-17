import apiClient from "../apiClient";

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
  return apiClient.delete(`/faqs/${id}`)
}

// FAQcount 요청드리기