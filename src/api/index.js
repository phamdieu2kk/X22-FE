import { apiElement } from "./core";

const api = {
    register: apiElement('POST', '/user/create'),
    login: apiElement('POST', '/user/login'),
    auth: apiElement('POST', '/user/auth'),
    topic: apiElement('GET', '/topic'),
    getChallenges: (topicId) => apiElement('GET', `/challenge?topicId=${topicId}`),
    getQuestions: (topicId) => apiElement('GET', `/questions/${topicId}`),
    putUpdateAccountForm:  apiElement('PUT', '/user/update'),
};

export default api;