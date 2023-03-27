import axios from "axios";
import config from "../config";

const apiClient = axios.create({
  baseURL: config.API_URL,
  timeout: 5_000,
});

export default apiClient;
