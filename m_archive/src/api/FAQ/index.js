import apiClient from "../apiClient";

export const getFAQs = () => {
  return apiClient.get('/faqs')
};