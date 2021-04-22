import React from "react";
import "./SearchLocations.css";
import LocationDetails from "../../components/LocationDetails/LocationDetails";
import { Link } from 'react-router-dom'
import Card from "react-bootstrap/Card"
import { ListGroup, ListGroupItem } from 'react-bootstrap';


function SearchLocations(props) {
  const { event, user, places, weather, history } = props;
  // const handler=(e)=>{console.log(e.id, '\n this is e');history.push({ pathname: '/location/details', props: {event}})}
  return (
    <>
      {places ? (
        <div className="locations-search" >
          {/* <span>Near by Parks</span><br />
          {places.map((park) => (
            // <span>
            <Link to={{ pathname: '/location/details', state: { park } }}>
              {park.name}
            </Link>
            // <br></br>
            // </span>
          ))} */}

          <Card style={{ width: 'auto', margin: '20px' }}>
            <Card.Header style={{ fontSize: '25px', fontWeight: 'bolder' }}>Nearby Parks</Card.Header>
            <ListGroup variant="flush">
            {places.map((park) => (
              <ListGroup.Item><Link to={{ pathname: '/location/details', state: { park } }}>
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
