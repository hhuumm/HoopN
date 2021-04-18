import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './EventListCard.css';
import EventDetailsCard from '../EventDetailsCard/EventDetailsCard'


function EventListCard({ user, event, handleDeleteMovie }) {
  return (
    <>

    <div className="card">
      <h1>{event.title}</h1>
      <h2>{event.date}</h2>
      <h2>{event.time}</h2>
      
    </div>

      <Card style={{ width: '18rem' }}>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body>
          <Card.Title>{event.title}</Card.Title>
          <span>{event.date}</span><br />
          <span>{event.time}</span><br />
          {/* <span>{event.createdBy.name}</span><br /> */}
          <button className="button" >View Details</button>
        </Card.Body>
      </Card>
    </>
  )
}

export default EventListCard;