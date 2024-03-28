import { apiElement } from "./core";

const api = {
    register: apiElement('POST', '/api/v1/user/create'),
    login: apiElement('POST', '/user/login')
   
};




export default api;