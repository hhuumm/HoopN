import React from 'react';
import { Link } from "react-router-dom";
import './EventDetailsCard.css'
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import EventDetails from '../../pages/EventDetails/EventDetails' //??????

function EventDetailsCard(props) {



	const { user, event, deleteEvent, participant, court, places,update ,handleAddPlayer} = props
	


	console.log(props, "\n^^^Props Event Details Card")
	console.log(places, "\nPlaces at the details card^^")
	let thisPlace = null;
	let inGame = false
	places.forEach(place => {
		if (event.placeId === place.place_id) {
			thisPlace = place;
		}
	})

	event.participant.forEach(p => {
		if(p._id === user._id)  {inGame = true} }
	)
	function updateEvent(){
	
	
		if(inGame)
			{ 	
				console.log("Leaving Game")
				let players = event.participant.filter(player=>{return player._id!=user._id})
				event.participant=players
			}
			else{
				event.participant.push(user)
				
			}
			console.log(event,"\n^^This is the new event")
			update(event)
	}

	return (
		<>
			<div className='EventList-detail'>
				<Card style={{ width: '18rem' }}>

					<Card.Img variant="top" src="holder.js/100px180" />
					<Card.Body>
						<Card.Title>{event.title}</Card.Title>
						<span style={{ fontWeight: '500'}}>{event.locName}</span><br/>
						<span>{event.address}</span><br/>
						<span>{event.date} - </span> 
            <span>{event.time}</span><br/>
						<span>Created By: {event.createdBy.name}</span><br/>
						<div>
						<span>Participants: <br/>
							{
							  
							event.participant.map(participants =>
								 participants.name
								
							)}

							{inGame ? <button onClick={updateEvent}>Leave</button> : <button onClick={updateEvent}> join </button> 

							}
						
							</span>
						</div>
					</Card.Body>

					{user && (user._id === event.createdBy || user._id === event.createdBy._id) &&
						<>
							<div className="up-del" >
								<Button
									variant="danger"
									type="submit"
									onClick={() => deleteEvent(event._id)}
								>Delete</Button>

								<Link
									to={{
										pathname: '/edit',
										state: { event },
										thisPlace
									}}

								><Button variant="primary">Edit</Button></Link>

							</div>
						</>
					}
					<Link
						className="button rev-btn"
						to={{
							pathname: '/events/review',
							state: { event },
							places
						}}
					>Review</Link>
				</Card>
			</div>
		</>
	)
}
export default EventDetailsCard;