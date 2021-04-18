import React from 'react';

function EventListCard({ user, event, handleDeleteMovie }) {
  return (
    <>
    <div className="card">
      <h1>{event.title}</h1>
      <h2>{event.date}</h2>
      <h2>{event.time}</h2>
      
    </div>
    </>
  )
}

export default EventListCard;