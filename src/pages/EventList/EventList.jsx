import React from 'react';
import EventListCard from '../../components/EventListCard/EventListCard'

function EventList(props) {
    const {user,events}=props
    const myGames= []
    
    if(props.myEvent)
    {   
        
        console.log("This is my events\n",user._id,"\n^^This is the user id\n",events)
        events.forEach(ev=>{
            ev.participant.forEach(player=>{
                if(player._id==user._id)
                {
                    myGames.push(ev)
                }
                
            })
        })
        console.log(myGames,"\n^^These are all the players games")
        
        return(<>
        <div className='EventList-grid'>
                    {myGames.map(event =>
                        <EventListCard 
                            key={event._id}
                            event={event}
                            user={props.user}
                        />
                    )}
                </div>
        </>)
    }
    else{
        console.log("This is all events")
        return (
            <>
                <div className='EventList-grid'>
                    {events.map(event =>
                        <EventListCard 
                            key={event._id}
                            event={event}
                            user={props.user}
                        />
                    )}
                </div>
            </>
        )
    }
    
}

export default EventList;