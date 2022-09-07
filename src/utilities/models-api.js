import sendRequest from './send-request';


const BASE_URL = '/api/models';

export function getAll() {
    return sendRequest(`${BASE_URL}/portfolio`);
}

export function newModel(userData) {
    return sendRequest(`${BASE_URL}/new`, 'POST', userData)
}