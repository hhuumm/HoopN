const axios = require("axios")

module.exports=
{
    getWeather,
    getPlaces,
    getPlaceById,
    getPhoto


}

async function getPhoto(req,res)
{
    let photoRef=req.params.ref;

    await axios.get(`https://maps.googleapis.com/maps/api/place/photo?key=${process.env.GOOGLE_KEY}&photoreference=${photoRef}`, {mode: 'cors'})
        .then((response) => {
            console.log(response.data,"^^This is the response data")
            return(response.data)
        })
        .catch(err=>{console.log(err)})

}

async function getPlaceById(req, res) {
    let placeId = req.params.id

    await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${process.env.GOOGLE_KEY}`, {mode: 'cors'})
        .then((response) => {
            console.log(response.data)
            return(response.data)
        })
        .then((data)=>{res.json(data)})
        .catch(err=>{console.log(err)})
}

function getWeather(req,res)
{
    if(req.params.lat)
    {
        let lat = req.params.lat;
        let lng= req.params.lng;
        
        axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.OPENWEATHER_KEY}&units=imperial`,{mode:'cors'})
            .then((response)=>
            {
                return(response.data)
            })
            .then((data)=>{res.json(data)})
            .catch(err=>{console.log(err)})

    }
    else if(req.params.zip){
        
       axios.get(`api.openweathermap.org/data/2.5/weather?zip=${req.params.zip},us&appid=${process.env.OPENWEATHER_KEY}&units=imperial`,{mode:'cors'})
        .then((result)=>res.json(result.data))
    }
    else{ res.json("No weather For u")}

   
}

async function getPlaces(req,res)
{
    //conditional return based on req
    //              -Does the request carry an exact coord or query search
    //              -Will check for lat/lng within params and render accordingly 
    if(req.params.lat)
    {
        let lat = req.params.lat;
        let lng = req.params.lng;

     await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${process.env.GOOGLE_KEY}&location=${lat},${lng}&radius=32000&type=park&name=basketball`)

        .then(result=>{
            
          res.json(result.data.results)
        
        })  
    }
    else if(req.params.zip){

        let zip = req.params.zip;
        await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?key=${process.env.GOOGLE_KEY}&query=${zip}&radius=32000&type=park`)
        .then(result=>{
            
          res.json(result.data.results)
        
        })  

    }
}