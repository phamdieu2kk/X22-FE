import { apiElement } from "./core";

const api = {
    register: apiElement('POST', '/user/create'),
    login: apiElement('POST', '/user/login'),
    auth: apiElement('POST', '/user/auth'),
    topic: apiElement('GET', '/topic'),
    getChallengeList : apiElement('GET','/challenge'),
    putUpdateAccountForm:  apiElement('PUT', '/user/update'),
    getQuestion: apiElement('GET', '/question'),
};

export default api;