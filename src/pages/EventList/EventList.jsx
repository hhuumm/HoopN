import React from 'react';
import EventListCard from '../../components/EventListCard/EventListCard'

function EventList(props, events, user, handleDeleteEvent) {
    return (
        <>
            <div className='EventList-grid'>
                {props.events.map(event =>
                    <EventListCard 
                        key={event._id}
                        event={event}
                        user={props.user}
                    />
                )}
            </div>
        </>
    )
}

export default EventList;