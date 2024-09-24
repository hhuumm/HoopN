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
    console.log(req.params,"^^This is the photoRef");
    
    let photoRef=req.params.ref;

    await axios.get(`https://maps.googleapis.com/maps/api/place/photo?photo_reference=${photoRef}&key=${process.env.GOOGLE_KEY}`, {mode: 'cors'})
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
    // -Does the request carry an exact coord or query search
    // -Will check for lat/lng within params and render accordingly 
    if(req.params.lat)
    {
        let lat = req.params.lat;
        let lng = req.params.lng;
        console.log(req.params.lat, "\n^^params.lat")
        console.log(req.params.lng, "\n^^params.lng")
        console.log(req.params, "\n^^ all params")
     await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=32000&types=park&name=basktball&key=${process.env.GOOGLE_KEY}`)

        .then(result=>{
            console.log(result.data.results);
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


async function getPlaces2(req, res) {
  const { lat, lng, zip } = req.params;
  console.log("places:", lat, lng, zip);

  if (lat && lng) {
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
          params: {
            key: process.env.GOOGLE_KEY,
            location: `${lat},${lng}`,
            radius: 32000, // Adjust radius as needed
            type: 'restaurant',   // You can change this to other types, e.g., 'restaurant', 'cafe', etc.
            rankby: 'distance' // Optional: rank by distance instead of prominence
          }
        });
        console.log(response.data);
    
        return res.json(response.data.results);
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Error fetching nearby places", error: error.message });
      }
  } else if (zip) {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json`, {
        params: {
          key: process.env.GOOGLE_KEY,
          query: zip,
          radius: 3200000, // Adjust radius as needed
          type: 'park'   // You can change this to other types, e.g., 'restaurant', 'cafe', etc.
        }
      });
      console.log(response.data);
  
      return res.json(response.data.results);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error fetching nearby places", error: error.message });
    }
  } else {
    return res.status(400).json({ message: "Invalid request" });
  }
}
