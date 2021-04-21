import React from 'react';
import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";

import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import './EventListCard.css';
import EventDetailsCard from '../EventDetailsCard/EventDetailsCard'


function EventListCard(props) {
  console.log(props.places,"\nThis is the places on props for the event list card")
  const { event, handleShow, user, history,places } = props;
  //  const handler=()=>{console.log(props);history.push({ pathname: '/events/details',props:{event}})}
  return (

    <>
      <div className="locations-list" >
        <Card style={{ width: '18rem' }}>
          {/*<Card.Img variant="top" src="holder.js/100px180"/>*/}
          <Card.Body>
            <Card.Title>{event.title}</Card.Title>
            <span>{event.date}</span><br />
            <span>{event.time}</span><br />
            <span>{event.createdBy.name}</span><br />
            {/* <button onClick={handler}>Details</button> */}

            <Link className="button evt-btn"
              to={{
                pathname: '/events/details',
                event,
                places
              }}
            >Details</Link><br></br>

          </Card.Body>
        </Card>
      </div>
    </>
  )
}

export default EventListCard;