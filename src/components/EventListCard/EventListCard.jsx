import React from 'react';
import { Link } from 'react-router-dom';
import EventDetailsCard from '../EventDetailsCard/EventDetailsCard'

function EventListCard(props) {
    let events = props.events;
    return(
        <>
        <div className='EventList-grid'>
        {events.map(event =>
          <EventDetailsCard 
            key={event._id}
            event={event}
            user={props.user}
            
          />
        )}
      </div>
        </>
    )
}

export default EventListCard;