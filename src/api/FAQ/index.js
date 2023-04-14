import apiClient from "../apiClient";

export const getFAQs = (page, limit) => {
  return apiClient.get('/faqs', {
    params: {
      page,
      limit,
    },
  });
};

export const deleteFaqAdmin = (id) => {
  return apiClient.delete(`/faqs/${id}`)
}