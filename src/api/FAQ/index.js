import apiClient from "../apiClient";

export const getFAQs = (page, limit) => {
  return apiClient.get('/faqs', {
    params: {
      page,
      limit,
    },
  });
};