import sendRequest from './send-request';

const BASE_URL = '/api/portfolio';

// export function newModel(userData) {
//     return sendRequest(`${BASE_URL}/new`, 'POST', userData)
// }

export function getAll() {
    return sendRequest(BASE_URL);
}

export function getOne(id) {
    return sendRequest(`${BASE_URL}/${id}`)
}

export function edit(id, data) {
    return sendRequest(`${BASE_URL}/${id}`, 'PUT', data)
}

export function deleteModel(id) {
    return sendRequest(`${BASE_URL}/${id}`, 'DELETE')
}