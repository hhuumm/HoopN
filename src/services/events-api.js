import tokenService from '../services/tokenService';
const BASE_URL = '/api/events/';

export function create(event) {
    return fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${tokenService.getToken()}`
        },
        body: JSON.stringify(event)
    }, {mode: 'cors'})
    .then(res => res.json());
}