import React from 'react';
import EventListCard from '../../components/EventListCard/EventListCard'

function EventList(props) {
    const { user, events, handleShow, history, places } = props
    const gamesNearMe = []

    console.log("This is all events")
  
    if(places) {
        
        events.forEach(ev => {
            places.forEach(place => {
                if(place.place_id === ev.placeId) {
                    gamesNearMe.push(ev)
                }
            })
        })
        
        return (
            <>
                {gamesNearMe.length ?
                    <div className='EventList-grid'>
                        {gamesNearMe.map(event =>
                            <EventListCard
                                places={places}
                                key={event._id}
                                event={event}
                                user={props.user}
                                handleShow={handleShow}
                                history={history}
                            />
                        )}
                    </div>
                    :
                    <div>
                        <img src="https://media.giphy.com/media/vZROLXfaqhbhHO8qwr/giphy.gif"></img>
                    </div>
                }
            </>
        )

    } else {

        return (
            <>
                <div>
                    <img src="https://media.giphy.com/media/vZROLXfaqhbhHO8qwr/giphy.gif"></img>
                </div>
            </>
        )
    }
}

export default EventList;