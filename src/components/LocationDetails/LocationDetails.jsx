import React from 'react';
import Card from 'react-bootstrap/Card';

function LocationDetails(props) {
    const {event, history, user, location,weather} = props;
    
    const handler=()=>{console.log(props);history.push({ pathname: '/locations/review', props:{event}})}
    // const {state} = props.location
    return (
        <>
          <Card style={{ width: '18rem' }}>
            {/*<Card.Img variant="top" src="holder.js/100px180"/>*/}
            <Card.Body>
              <Card.Title>{props.location.state.park.name}</Card.Title>
              <img
            src={props.location.state.park.icon}
            className="park"
            alt="hoop'n"
          /><br />
              <span>Google Rating: {props.location.state.park.rating}</span><br /> 
                {/* <span>{props.weather.[{}]}</span><br />  */}
                <button onClick={handler}>Add Review</button><br></br>
                <h6>Display Reviews Here</h6>
            </Card.Body>
          </Card>
        </>
      )
    }
    export default LocationDetails;