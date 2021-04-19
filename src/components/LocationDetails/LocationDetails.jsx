import React from 'react';
import Card from 'react-bootstrap/Card';
function LocationDetails(props) {
    const {event,user,location,weather} = props;
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
              <span>Rating: {props.location.state.park.rating}</span><br /> 
                {/* <span>{props.weather.[{}]}</span><br />  */}
            </Card.Body>
          </Card>
        </>
      )
    }
    export default LocationDetails;