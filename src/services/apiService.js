const BASE_URL = '/api/discovery/';

async function request(path) {
  const response = await fetch(BASE_URL + path);
  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json') ? await response.json() : response;
  if (!response.ok) throw new Error(payload.error || 'The discovery request failed');
  return payload;
}

const getWeatherZ = (zip) => request(`weather/zip/${encodeURIComponent(zip)}`);
const getWeatherL = (lat, lng) => request(`weather/loc/${lat}&${lng}`);
const getPlacesZ = (zip) => request(`places/zip/${encodeURIComponent(zip)}`);
const getPlacesL = (lat, lng) => request(`places/loc/${lat}&${lng}`);
const getPlaceById = (placeId) => request(`place/${encodeURIComponent(placeId)}`);
const getPhoto = (reference) => request(`photos/${encodeURIComponent(reference)}`);

export default { getWeatherZ, getWeatherL, getPlacesZ, getPlacesL, getPlaceById, getPhoto };
