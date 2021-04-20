const axios = require("axios")

module.exports=
{
    getWeather,
    getPlaces


}


function getWeather(req,res)
{
    // console.log("Hello?")
    if(req.params.lat)
    {
        let lat = req.params.lat;
        let lng= req.params.lng;
        // let unit = imperial
        //use params to set lat/lng
        axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.OPENWEATHER_KEY}&units=imperial`,{mode:'cors'})
            .then((response)=>
            {
                console.log(response.data.main)
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
     await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${process.env.GOOGLE_KEY}&location=${lat},${lng}&radius=8000&type=park`)
        .then(result=>{
            
            //Result.geometry.location= {lat,lng}
            console.log(result.data)
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