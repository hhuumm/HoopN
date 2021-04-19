const router = require('express').Router();
const api = require('../controllers/api');


router.get('/weather/loc/:lat&:lng',api.getWeather)
router.get('/weather/zip/:zip',api.getWeather)
router.get('/nps/loc/:lat&:lng',api.getPlaces)
router.get('/nps/zip/:zip',api.getPlaces)

module.exports=router