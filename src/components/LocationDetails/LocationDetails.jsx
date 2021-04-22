import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'
import './LocationDetails.css'


function LocationDetails(props) {
  const { events, history, user, location, weather, places } = props;
  const{getPhoto}=props.location
  const{park}=location.state;
  const photos =[]

  async function getphotos(pho){
 
    return await getPhoto(pho.photo_reference).then(result=>{return result})
   
}
park.photos.forEach(p=>{getphotos(p.photo_reference)})


photos.forEach(photo=>{console.log("","\n^^This is a photo object")})

  
  return (
    <>
      <div className='Locations-grid'>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title  style={{ color: '#F24726', fontWeight: 'bolder' }}>{props.location.state.park.name}</Card.Title><br />
            <img
              src={props.location.state.park.icon}
              className="park"
              alt="hoop'n"
            /><br /><br />
               <img
              src={photos[0]}
              className="park"
              alt="hoop'n"
            /><br /><br />
            <span>
              {props.location.state.park.vicinity}
            </span><br /><br />
            <span>
              Google Rating: {props.location.state.park.rating}
            </span><br /><br />
            <Link className="button evt-btn"
              to={{
                pathname: '/events/add',
                props: { location }
              }}
            >
              Create New Game
            </Link><br></br>
          </Card.Body>
        </Card>
      </div>
    </>
  )
}
export default LocationDetails;