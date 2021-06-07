import axios from "axios";
import { DEV } from "../../constants/services/base";

const API_URL = DEV;

//*------- Axios interseptors --------*//

axios.interceptors.response.use(
  (response) => {
    if (response.data && response.data.errors) {
      return Promise.reject(response.data);
    }
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);

//*--------------------------------------*//

export const axiosService = (config, data, headers) => {
  switch (config.method) {
    case "POST":
      return axios.post(API_URL + config.url, data, headers);
    case "PUT":
      return axios.put(API_URL + config.url, data);
    case "GET":
      return axios.get(API_URL + config.url);
    case "DELETE":
      return axios.delete(API_URL + config.url);
    default:
      return;
  }
};
