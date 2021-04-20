import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'
// Route to the park------>props.history.location.props.location.props.location.state.park
function LocationDetails(props) {
  const { event, history, user, location, weather, places } = props;
  // const locationEvents = 

  // let events = 
  // const { park } = props.location.props.location.state
  // console.log(park)

  // const reviewHandler = () => { console.log(props); history.push({ pathname: '/locations/review', state: props }) }

  // const gameHandler = () => { console.log(props); history.push({ pathname: '/events/add', state: places }) }

  return (
    <>
      <div className='EventList-grid'>
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

            {/* <button onClick={gameHandler}>Details</button> */}

            <Link className="button"
              to={{
                pathname: '/events/add',
                props: { location }
              }}
            >Create Event</Link><br></br>
            <Link className="button"
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