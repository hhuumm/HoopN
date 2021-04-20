import React from 'react';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom'
// Route to the park------>props.history.location.props.location.props.location.state.park
function LocationDetails(props) {
    const {event, history, user, location,weather} = props;
    
    const reviewHandler=()=>{console.log(props);history.push({ pathname: '/locations/review', props:{props}})}

    const gameHandler=()=>{console.log(props);history.push({ pathname: '/events/add', props})}

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
                <button onClick={gameHandler}>Add New Game</button><br></br>
                <button onClick={reviewHandler}>Add Review</button><br></br>
                <h6>Display Reviews Here</h6>
            </Card.Body>
          </Card>
        </>
      )
    }
    export default LocationDetails;