import React from 'react';
import './MyEventsList.css'
import EventListCard from '../../components/EventListCard/EventListCard'

function MyEventsList(props) {
    const { user, events, handleShow, history } = props
    const myGames = []

    console.log("This is my events\n", user._id, "\n^^This is the user id\n", events)

    events.forEach(ev => {
        ev.participant.forEach(player => {
            if (player._id === user._id) {
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
                    <img className="load-gif" src="https://media.giphy.com/media/vZROLXfaqhbhHO8qwr/giphy.gif"></img>
                </div>
            }
        </>
    )
}

export default MyEventsList;