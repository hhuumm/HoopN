import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import './EventListCard.css';


function EventListCard(props) {
  const { event, handleShow, user, history,places } = props;

  return (
    <>
      <div className="locations-list" >
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{event.title}</Card.Title>
            <span>Location: {event.locName}</span><br/>
            <span>Address: {event.address}</span><br/>
            <span>Date: {event.date}</span><br/>
            <span>Time: {event.time}</span><br/>
            <span>Created By: {event.createdBy.name}</span><br/>

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