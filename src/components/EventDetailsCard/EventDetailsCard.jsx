import React from 'react';
import { Link,useParams } from "react-router-dom";
import './EventDetailsCard.css'
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import EventDetails from '../../pages/EventDetails/EventDetails' //??????
import axios from 'axios';


function EventDetailsCard(props) {
	console.log(props,"^^Events details card inside events details")
	
	let event;
	
	const { id } = useParams()
	const { user, deleteEvent, participant, court, places,update ,handleAddPlayer,history,events} = props
	let participating=false;
	let inGame=[];

	if(event){}
	else if(id&&events)
	{	console.log("Looking for event")
		events.forEach(e=>{
			if(e._id.toString()==id.toString())
			{
				event=e
			}

		})

	}
	console.log(event,"Event b4 execution")
	
console.log(id, "\n THis is the id^^^^")
console.log(events,"\n^^Thisi s the events")
	console.log(props, "\n^^^Props Event Details Card")
	console.log(places, "\nPlaces at the details card^^")
	let thisPlace = null;
	places.forEach(place => {
		if (event.placeId === place.place_id) {
			thisPlace = place;
		}
	})
	console.log(event.participant)
	async function updateEvent(){
	
	
		if(participating)
			{ 	
				console.log("Leaving Game")
				let players = event.participant.filter(player=>{return player._id!=user._id})
				event.participant=players
			}
			else{
				event.participant.push(user)
				
			}
			
			await update(event)
		}
	try{
	let inGame =event.participant.filter(person=>person._id.toString()==user._id.toString())
	if(inGame.length>0){participating=true;}
	
	}
	catch(err){
			if(event.participant.includes(user._id)){participating=true}

	}

function clicked(e)
{


	console.log(e.target);

}
//thisPlace = current google place
//event = current event

 
	return (
		<>
			<div className='EventList-detail'>
				<Card style={{ width: '18rem' }}>

					<Card.Img variant="top" src="holder.js/100px180" />
					<Card.Body>
						<Card.Title>{event.title}</Card.Title>
						<span>Location: {event.locName}</span><br/>
						<span>Address: {event.address}</span><br/>
						<span>{event.date}</span><br/>
						<span>{event.time}</span><br/>
						<span>Created By: {event.createdBy.name}</span><br/>
						<div>
						<span>Participants:
							{
							  
							event.participant.map(participants =>
								 participants.name
								
							)}

							{participating? <button onClick={updateEvent}>Leave</button> : <button onClick={updateEvent}> join </button> 

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
					<span className="active-span" >Rate(1-5): </span>
                    <select
                        name="rating"
                        placeholder="Rating 1-5"
                        id="location_review_rating"
                        type="text"
                        className="active"
                        required
                    >
                        <option></option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                name="content"
                                placeholder="Write Review Here"
                                id="location_review_content"
                                type="text"
                                className="active"
                            />
                        </div>
                    </div>
					<button
						className="button rev-btn"
						onClick={clicked}
					>Review</button>
						<button
						className="button rev-btn"
						onClick={clicked}
					>Submit</button>
				</Card>
			</div>
		</>
	)
}
export default EventDetailsCard;