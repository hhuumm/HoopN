const BASE_URL = '/api/api/';


function getWeather(zip)
{
    return fetch (BASE_URL+"weather/zip/"+zip)
}

function getWeather(lat,lng)
{
    return fetch (BASE_URL+"weather/loc/"+lat+"&"+lng)

}

function getPLaces(zip)
{
    return fetch (BASE_URL+"nps/zip/"+zip)
}

function getPLaces(lat,lng)
{
    return fetch (BASE_URL+"nps/loc/"+lat+"&"+lng)
}