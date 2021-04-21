import React from 'react';
import './EventDetails.css'
import EventDetailsCard from '../../components/EventDetailsCard/EventDetailsCard'


function EventDetails(props) {
    console.log(props,"\n^^This is props for EventDetails")
    const{places}=props.history.location
  //Potential routes to event....
  //After creating the event---->props.history.location
  //When selecting from list of events--->props.history.location.props.event
  const {event}=props.event?props:props.history.location
  console.log(places,"\n places at the event details")
//   if(props.event.event){event = props.event.event;console.log(3)}
//    if(props.history.location.event){event =props.history.location.event;console.log(1)}
//   else if(props.history.location.props.event){event = props.history.location.props;console.log(2)}
    return (
        <>
            <EventDetailsCard 
                places={places}
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