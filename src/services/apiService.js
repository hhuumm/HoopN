const BASE_URL = '/api/api/';


function getWeatherZ(zip)
{
    fetch (BASE_URL+"weather/zip/"+zip).then(res=>{console.log(res);return res.json()})
    .catch(err => console.log(err));
}

async function getWeatherL(lat,lng)
{
    return await fetch (BASE_URL+"weather/loc/"+lat+"&"+lng)
    .then((response)=>{
        return response.json()

    }) 
    .then((data)=>{
        console.log(data)
       return data
        
    })
    .catch(err=>{console.log(err)})

}

function getPlacesZ(zip)
{
    return fetch (BASE_URL+"nps/zip/"+zip)
}


function getPlacesL(lat,lng)
{
   return fetch (BASE_URL+"nps/loc/"+lat+"&"+lng)
    .then((response)=>{
        return response.json()

    }) 
    .then((data)=>{
       
       return data
        
    })
    .catch(err=>{console.log(err)})
}

// eslint-disable-next-line
export default
{
getWeatherZ,
getWeatherL,
getPlacesZ,
getPlacesL

}