import sendRequest from './send-request';


const BASE_URL = '/api/models';

export function getAll() {
    return sendRequest(`${BASE_URL}/portfolio`);
}

export function newModel(userData) {
    return sendRequest(`${BASE_URL}/new`, 'POST', userData)
}


export function edit(modelId) {
    return sendRequest(`/portfolio/${ modelId.name }`, 'PUT')
}

export function deleteModel(modelId) {
    // console.log(modelId)
    return sendRequest(`/portfolio/${ modelId }`, 'DELETE')
}