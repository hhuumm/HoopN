import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'
import './LocationDetails.css'

// Route to the park------>props.history.location.props.location.props.location.state.park
function LocationDetails(props) {
  const { events, history, user, location, weather, places } = props;
  const{park}=location.state;
  let parkEvents=[]
  events.forEach(event=>{
    console.log("EventPlaceID::"+event.placeId+"\nParkPlaceID ::"+park.place_id)
    if(event.placeId==park.place_id){console.log(true);parkEvents.push(event)}
  
  })
  console.log(parkEvents,"\n^^These are the park Events at the Location Details Page")


  
  return (
    <>
      <div className='Locations-grid'>
        <Card style={{ width: '18rem' }}>
          {/*<Card.Img variant="top" src="holder.js/100px180"/>*/}
          <Card.Body>
            <Card.Title  style={{ color: '#F24726', fontWeight: 'bolder' }}>{props.location.state.park.name}</Card.Title>
            <img
              src={props.location.state.park.icon}
              className="park"
              alt="hoop'n"
            /><br />
            <span>Google Rating: {props.location.state.park.rating}</span><br />
            {/* <span>{props.weather.[{}]}</span><br />  */}

            {/* <button onClick={gameHandler}>Details</button> */}

            <Link className="button evt-btn"
              to={{
                pathname: '/events/add',
                props: { location }
              }}
            >Create Event</Link><br></br>
            <Link className="button evt-btn"
              to={{
                pathname: '/locations/review',
                props: { location }
              }}
            >Add Review</Link><br></br>


            {/* <Link className="button" onClick={reviewHandler}>Add Review</Link><br></br> */}
            <h6>Display Reviews Here</h6>
          </Card.Body>
        </Card>
      </div>
    </>
  )
}
export default LocationDetails;