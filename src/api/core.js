import axios from "axios";

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