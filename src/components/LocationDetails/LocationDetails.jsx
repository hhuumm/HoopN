import React from 'react';
import Card from 'react-bootstrap/Card';

function LocationDetails(props) {
    const {event,user,places,weather} = props;

    return (
    
        <>
          <Card style={{ width: '18rem' }}>
            {/*<Card.Img variant="top" src="holder.js/100px180"/>*/}
            <Card.Body>
              <Card.Title>{event.title}</Card.Title>
              <span>{places.name}</span><br />
              <span>{places.photos}</span><br />
              <span>{places.icon}</span><br />
              <span>{weather.main}</span><br />
            </Card.Body>
          </Card>
        </>
      )
    }
    
    export default LocationDetails;