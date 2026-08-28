const axios = require("axios");

module.exports = { getWeather, getPlaces, getPlaceById, getPhoto };

function requiredKey(name) {
  const value = process.env[name];
  if (!value) {
    const error = new Error(`${name} is not configured`);
    error.status = 503;
    error.expose = true;
    throw error;
  }
  return value;
}

async function getWeather(req, res, next) {
  try {
    const params = req.params.lat
      ? { lat: req.params.lat, lon: req.params.lng }
      : { zip: `${req.params.zip},us` };
    const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: { ...params, appid: requiredKey("OPENWEATHER_KEY"), units: "imperial" },
      timeout: 10_000,
    });
    res.json(response.data);
  } catch (error) { next(upstreamError(error, "Weather service request failed")); }
}

async function getPlaces(req, res, next) {
  try {
    const nearby = Boolean(req.params.lat);
    const endpoint = nearby ? "nearbysearch" : "textsearch";
    const params = nearby
      ? { location: `${req.params.lat},${req.params.lng}`, radius: 16_000, type: "park", keyword: "basketball court" }
      : { query: `basketball courts near ${req.params.zip}`, radius: 16_000, type: "park" };
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/${endpoint}/json`, {
      params: { ...params, key: requiredKey("GOOGLE_KEY") },
      timeout: 10_000,
    });
    res.json(response.data.results || []);
  } catch (error) { next(upstreamError(error, "Places service request failed")); }
}

async function getPlaceById(req, res, next) {
  try {
    const response = await axios.get("https://maps.googleapis.com/maps/api/place/details/json", {
      params: { place_id: req.params.id, key: requiredKey("GOOGLE_KEY") },
      timeout: 10_000,
    });
    res.json(response.data);
  } catch (error) { next(upstreamError(error, "Place details request failed")); }
}

async function getPhoto(req, res, next) {
  try {
    const response = await axios.get("https://maps.googleapis.com/maps/api/place/photo", {
      params: { photo_reference: req.params.ref, maxwidth: 1200, key: requiredKey("GOOGLE_KEY") },
      responseType: "arraybuffer",
      timeout: 10_000,
    });
    res.type(response.headers["content-type"] || "image/jpeg").send(response.data);
  } catch (error) { next(upstreamError(error, "Place photo request failed")); }
}

function upstreamError(error, fallback) {
  if (error.status) return error;
  const wrapped = new Error(fallback, { cause: error });
  wrapped.status = error.response?.status || 502;
  wrapped.expose = true;
  return wrapped;
}
