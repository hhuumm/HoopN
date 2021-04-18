import React from 'react';

import EventDetailsCard from '../../components/EventDetailsCard/EventDetailsCard'

function EventList(props, events, user, handleDeleteEvent) {
    return (
        <>
            <div className='EventList-grid'>
                {props.events.map(event =>

                    <EventDetailsCard 

                        key={event._id}
                        event={event}
                        user={props.user}
                        handleDeleteEvent={props.handleDeleteEvent}
                        handleUpdateEvent={props.handleUpdateEvent}
                    />
                )}
            </div>
        </>
    )
}

export default EventList;