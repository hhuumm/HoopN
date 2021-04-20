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
        console.log(data, 'weather')
       return data
        
    })
    .catch(err=>{console.log(err)})

}

function getPlacesZ(zip)
{
    return fetch (BASE_URL+"nps/zip/"+zip)
}
function getPhoto(ref)
{
    return fetch (BASE_URL+"photos/"+ref)
    .then((response)=>{
        return response.json()

    }) 
    .then((data)=>{
       
        console.log(data, 'places')
       return data
        
    })
    .catch(err=>{console.log(err)})

}

function getPlacesL(lat,lng)
{
   return fetch (BASE_URL+"nps/loc/"+lat+"&"+lng)
    .then((response)=>{
        return response.json()

    }) 
    .then((data)=>{
       
        console.log(data, 'places')
       return data
        
    })
    .catch(err=>{console.log(err)})
}

function getPlaceById(placeId) {
    return fetch (BASE_URL+`place/${placeId}`)
    .then((response)=>{
        return response.json()

    }) 
    .then((data)=>{
       
        console.log(data, 'places')
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
getPlacesL,
getPlaceById,
getPhoto
}