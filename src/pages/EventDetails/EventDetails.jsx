import React from 'react';
import './EventDetails.css'

import EventDetailsCard from '../../components/EventDetailsCard/EventDetailsCard'


function EventDetails(props) {
    const {event}=props.history.location.props
    return (
        <>
            <EventDetailsCard 
                event={event}
                history={props.history}
                update={props.update}
                user={props.user}
                deleteEvent={props.delete}>
                <h1>Event Details Page</h1>
            </EventDetailsCard>
        </>
    )
}

export default EventDetails;