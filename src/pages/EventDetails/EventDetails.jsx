import React from 'react';
import './EventDetails.css'
import EventDetailsCard from '../../components/EventDetailsCard/EventDetailsCard'


function EventDetails(props) {
    return (
        <EventDetailsCard
            places={props.places}
            history={props.history}
            user={props.user}
            deleteEvent={props.delete}
            setParticipation={props.setParticipation}
            addReview={props.addReview}
            events={props.events}
        />
    )
}

export default EventDetails;
