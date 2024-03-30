import { apiElement } from "./core";

const api = {
    register: apiElement('POST', '/api/v1/user/create'),
    login: apiElement('POST', '/user/login'),
    auth: apiElement('POST', '/user/auth'),
    topic: apiElement('GET', '/topic'),
    getChallenges: apiElement('GET', '/challenges/:topicId'),

};




export default api;