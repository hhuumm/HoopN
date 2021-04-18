import React from 'react';
import './EventDetails.css'

import EventDetailsCard from '../../components/EventDetailsCard/EventDetailsCard'


function EventDetails(props) {
    return (
        <>
            <EventDetailsCard event={props.current}
                history={props.history}
                update={props.update}
                user={props.user}
                delete={props.delete}>
                <h1>Event Details Page</h1>
            </EventDetailsCard>
        </>
    )
}

export default EventDetails;