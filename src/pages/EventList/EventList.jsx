import React from 'react';
import './EventList.css'
// import EventListCard from '../../components/EventListCard/EventListCard'

function EventList(props) {
    return (
        <>
            {/* <div className='EventList-grid'>
                {props.events.map(event =>
                    <EventListCard 
                        key={event._id}
                        event={event}
                        user={props.user}
                    />
                )}
            </div> */}
            <h3>Event List Page</h3>
        </>
    )
}

export default EventList;