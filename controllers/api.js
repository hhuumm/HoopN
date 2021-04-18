const { default: axios } = require("axios")

module.exports=
{
    getWeather,
    getPlaces


}


async function getWeather(req,res)
{
    // console.log("Hello?")
    if(req.params.lat)
    {
        let lat = req.params.lat;
        let lng= req.params.lng;
        //use params to set lat/lng
       await axios.get (`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.OPENWEATHER_KEY}`)
        .then((result)=>{console.log(result.data);return result.data}).catch(err=>{console.log(err)})

    }
    else if(req.params.zip){
        
        await axios.get(`api.openweathermap.org/data/2.5/weather?zip=${req.params.zip},us&appid=${process.env.OPENWEATHER_KEY}`,{mode:'cors'})
        .then((result)=>res.json(result.data))
    }
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
     await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${process.env.GOOGLE_KEY}&location=${lat},${lng}&radius=8000&type=park`)
        .then(result=>{
            
            //Result.geometry.location= {lat,lng}
            
          res.json(result.data.results)
        
            // return result.json()}
        })  
    }
    else if(req.params.zip){

        let zip = req.params.zip;
        await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?key=${process.env.GOOGLE_KEY}&query=${zip}&radius=8000&type=park`)
        .then(result=>{
            
            //Result.geometry.location= {lat,lng}
            
          res.json(result.data.results)
        
            // return result.json()}
        })  

    }
}