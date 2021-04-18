import React from 'react';
import './EventDetails.css'
import EventDetailsCard from "../../components/EventDetailsCard/EventDetailsCard"

function EventDetails(props) {
    return (
        <>
        <EventDetailsCard  event={props.current}
              history={props.history}
              update={props.update}
              user={props.user}
              delete={props.delete}>Event Details Page</EventDetailsCard> 
        </>
    )
}

export default EventDetails;