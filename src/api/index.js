import { apiElement } from "./core";

const api = {
    register: apiElement('POST', '/user/create'),
    login: apiElement('POST', '/user/login'),
    auth: apiElement('POST', '/user/auth'),
    topic: apiElement('GET', '/topic'),
    getChallenges: (topicId) => apiElement('GET', `/challenge?topicId=${topicId}`),
    
    putUpdateAccountForm:  apiElement('PUT', '/user/update'),
    getQuestion: apiElement('GET', '/question/create'),
};

export default api;