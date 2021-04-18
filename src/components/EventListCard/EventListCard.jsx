import React from 'react';
import EventDetailsCard from '../EventDetailsCard/EventDetailsCard'

function EventListCard({ user, event, handleDeleteMovie }) {
  return (
    <>
      <h1>{event.title}</h1>
      <h1>{event.date}</h1>
      <h1>{event.time}</h1>
    </>
  )
}

export default EventListCard;