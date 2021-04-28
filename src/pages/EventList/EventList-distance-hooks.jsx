import React from 'react';
import EventListCard from '../../components/EventListCard/EventListCard'

function EventList(props) {

    // const [rating, setRating] = React.useState(null)
    const [dist, setDistance] = React.useState(null)
    const { user, events, handleShow, history, places, weather } = props
    const gamesNearMe = []

    console.log("This is all events")

    const handleDist = (e) => {
        console.log(e.target.value, "\n^^e.target.value")
        setDistance(e.target.value)
    }
    // const handleRating = (e) => {
    // 	console.log(e.target.value, "\n^^e.target.value")
    // 	setRating(e.target.value)
    // }

    if (places) {

        events.forEach(ev => {
            places.forEach(place => {
                if (place.place_id === ev.placeId) {
                    gamesNearMe.push(ev)
                }
            })
        })

        return (
            <>
                <div className='nearby'>
                    <input
                        name="content"
                        placeholder="miles"
                        id="location_review_content"
                        type="text"
                        value={dist}
                        className="active"
                        onChange={(e) => handleDist(e)}
                    />
                    <h5 className='n1'>Games within 10 miles </h5>
                    <h5 className='n2'> from {weather.name}</h5>
                </div>
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
                                events={events}
                            />
                        )}
                    </div>
                    :
                    <div>
                        <img className="load-gif" src="https://media.giphy.com/media/vZROLXfaqhbhHO8qwr/giphy.gif"></img>
                    </div>
                }
            </>
        )

    } else {

        return (
            <>
                <div>
                    <img className="load-gif" src="https://media.giphy.com/media/vZROLXfaqhbhHO8qwr/giphy.gif"></img>
                </div>
            </>
        )
    }
}

export default EventList;