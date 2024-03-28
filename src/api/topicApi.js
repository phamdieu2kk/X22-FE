import axiosClient from "./axiosClient";


const topicApi = {
  getAll: (params) => {
    const url = '/api/v1/topic/create';
    return axiosClient.get(url, { params });
  },

  get: (id) => {
    const url = `/api/v1/topic/create/${id}`;
    return axiosClient.get(url);
  },
}

export default topicApi;