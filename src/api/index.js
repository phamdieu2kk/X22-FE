import { apiElement } from "./core";

const api = {
    register: apiElement('POST', '/user/create'),
    login: apiElement('POST', '/user/login'),
    auth: apiElement('POST', '/user/auth'),
    topic: apiElement('GET', '/topic'),
    getChallenges: apiElement('GET', '/challenge?topicId='),
    getQuestions: apiElement('GET', '/questions/:topicId'),
};




export default api;