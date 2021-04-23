import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import './EventListCard.css';


function EventListCard(props) {
  const { event, handleShow, user, history,places ,events} = props;
  const randPic = Math.floor(Math.random() * (20 - 1 + 1)) + 1;

  return (
    <>
      <div className="locations-list" >
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{event.title}</Card.Title>
            <img width='200' src={`/images/${randPic}.jpg`}/><br/>
            <span style={{ fontWeight: '500' }}>{event.locName}</span><br/>
            <span>{event.address}</span><br/>
            <span>{event.date} - </span> 
            <span>{event.time}</span><br/>
            <span>Created By: {event.createdBy.name}</span><br/>

            <Link className="button evt-btn"
              to={{
                pathname: `/events/details/${event._id}`,
                event,
                places,
                events
              }}
            >Details</Link><br></br>

          </Card.Body>
        </Card>
      </div>
    </>
  )
}

export default EventListCard;