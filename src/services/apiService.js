const BASE_URL = '/api/api/';


function getWeatherZ(zip)
{
    return fetch (BASE_URL+"weather/zip/"+zip)
}

function getWeatherL(lat,lng)
{
    return fetch (BASE_URL+"weather/loc/"+lat+"&"+lng)

}

function getPLacesZ(zip)
{
    return fetch (BASE_URL+"nps/zip/"+zip)
}

function getPLacesL(lat,lng)
{
    return fetch (BASE_URL+"nps/loc/"+lat+"&"+lng)
}