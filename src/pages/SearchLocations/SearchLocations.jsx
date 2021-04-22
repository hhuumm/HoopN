import React from "react";
import "./SearchLocations.css";
import LocationDetails from "../../components/LocationDetails/LocationDetails";
import { Link } from 'react-router-dom'
import Card from "react-bootstrap/Card"
import { ListGroup, ListGroupItem } from 'react-bootstrap';


function SearchLocations(props) {
  const { event, user, places, weather, history,getPhoto} = props;


  
  return (
    <>
      {places ? (
        <div className="locations-search" >
          
          <Card style={{ width: 'auto', margin: '20px' }}>
            <Card.Header style={{ fontSize: '25px', fontWeight: 'bolder' }}>Nearby Parks</Card.Header>
            <ListGroup variant="flush">
            {places.map((park) => (
              
              <ListGroup.Item><Link to={{ pathname: '/location/details', state: { park },getPhoto }}>
              {park.name}
            </Link></ListGroup.Item>
            ))}
            </ListGroup>
          </Card>

        </div>
      ) : (
        <div>
          <img className="load-gif" src="https://media.giphy.com/media/vZROLXfaqhbhHO8qwr/giphy.gif"></img>
        </div>
      )}
    </>
  );
}
export default SearchLocations;
