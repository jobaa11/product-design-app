import sendRequest from './send-request';


const BASE_URL = '/api/models';

export function getAll() {
    return sendRequest(`${BASE_URL}/portfolio`);
}

export function newModel(userData) {
    return sendRequest(`${BASE_URL}/new`, 'POST', userData)
}


export function getById(id) {
    return sendRequest(`/portfolio/${id}`)
}
export function edit(id) {
    return sendRequest(`/portfolio/${id}`, 'PUT')
}

export function deleteModel(id) {
    return sendRequest(`/portfolio/${id}`, 'DELETE')
}