import React from 'react';
import { Link } from "react-router-dom";
import './EventDetailsCard.css'
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import EventDetails from '../../pages/EventDetails/EventDetails' //??????

function EventDetailsCard(props) {

	
	const { user, event, deleteEvent, court,places} = props
	console.log(props,"\n^^^Props Event Details Card")
	console.log(places,"\nPlaces^^")
	let thisPlace=null;
	places.forEach(place=>{
		if(event.placeId==place.place_id)
		{
			thisPlace=place;
		
		}
	})


	return (
		<>
			<div className='EventList-detail'>
				<Card style={{ width: '18rem' }}>
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
										state: { event }
									}}

								><Button variant="primary">Edit</Button></Link>

							</div>
						</>
					}
					<Card.Img variant="top" src="holder.js/100px180" />
					<Card.Body>
						<Card.Title>{event.title}</Card.Title>
						<span>{event.date}</span><br />
						<span>{event.time}</span><br />
						<span>{event.createdBy.name}</span><br />
					</Card.Body>
					<Link
						to={{
							pathname: '/events/review',
							state: { event }
						}}
					><Button variant="primary">Leave Review</Button></Link>
				</Card>
			</div>
		</>
	)
}
export default EventDetailsCard;