import axios from "axios";

export const setAccessToken = (token) => {
    localStorage.setItem('AccessToken', token);
    console.log('token', localStorage.getItem('AccessToken'));
    axios.defaults.headers.Authorization = token;
}
export const getAccessToken = () => {
    const token = localStorage.getItem('AccessToken')
    axios.defaults.headers.Authorization = token
    return { token }
}




export const apiElement = (method, path, customBaseUrl = '') => {
    return {
        invoke: ({ params, queries, data }) => {

            let actualPath = path;
            for (const key in params) actualPath = actualPath.replace(`:${key}`, params[key]);

            return axios.request({
                method,
                baseURL: customBaseUrl ? customBaseUrl : import.meta.env.VITE_API_GATEWAY,
                params: queries,
                url: actualPath,
                data: data
            });
        }
    };
}