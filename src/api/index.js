import { apiElement } from "./core";

const api = {
    register: apiElement('POST', '/user/create'),
    login: apiElement('POST', '/user/login')
};

export default api;