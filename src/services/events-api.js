import tokenService from './tokenService';

const BASE_URL = '/api/events';

async function request(path = '', options = {}) {
  const token = tokenService.getToken();
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || 'The event request failed');
  return payload;
}

export const getAll = () => request();
export const getLocationEvents = (locationId) => request(`/location/${encodeURIComponent(locationId)}`);
export const myGames = () => request('/mine');
export const create = (event) => request('', { method: 'POST', body: JSON.stringify(event) });
export const update = (event) => request(`/${event._id}`, { method: 'PUT', body: JSON.stringify(event) });
export const deleteOne = (id) => request(`/${id}`, { method: 'DELETE' });
export const join = (id) => request(`/${id}/participants`, { method: 'POST' });
export const leave = (id) => request(`/${id}/participants/me`, { method: 'DELETE' });
export const createReview = (id, review) => request(`/${id}/reviews`, { method: 'POST', body: JSON.stringify(review) });
