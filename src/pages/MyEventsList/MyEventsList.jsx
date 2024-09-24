import React from 'react';
import './MyEventsList.css'
import EventListCard from '../../components/EventListCard/EventListCard'

function MyEventsList(props) {
    const { user, events, handleShow, history, places } = props
    const myGames = []

    events.forEach(ev => {
        ev.participant.forEach(player => {
            if (player._id === user._id) {
                myGames.push(ev)
            }
        })
    })

    return (
        <>
        <h4 className="my-game">My Games</h4>
            {myGames.length ?
                <div className='EventList-grid'>
                    {myGames.map(event =>
                        <EventListCard
                            key={event._id}
                            event={event}
                            user={user}
                            handleShow={handleShow}
                            history={history}
                            places={places}
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