import React from 'react';
import EventListCard from '../../components/EventListCard/EventListCard'

function EventList(props) {
    const { user, events,handleShow,history } = props
    const myGames = []

    if (props.myEvent) {

        console.log("This is my events\n", user._id, "\n^^This is the user id\n", events)
        events.forEach(ev => {
            ev.participant.forEach(player => {
                if (player._id == user._id) {
                    myGames.push(ev)
                }

            })
        })

        return (
            <>
                {myGames.length ?
                    <div className='EventList-grid'>
                        {myGames.map(event =>
                            <EventListCard
                                event={event}
                                user={user}
                                handleShow={handleShow}
                                history={history}
                            />
                        )
                        }
                    </div>
                    :
                    <div>
                        <img src="https://media.giphy.com/media/vZROLXfaqhbhHO8qwr/giphy.gif"></img>
                    </div>
                }
            </>
        )
    }
    else {
        console.log("This is all events")
        return (
            <>
                {events.length ?
                    <div className='EventList-grid'>
                        {events.map(event =>
                            <EventListCard
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
    }
}

export default EventList;