import React from 'react';
import { Link } from "react-router-dom";
import './EventDetailsCard.css'
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import EventDetails from '../../pages/EventDetails/EventDetails' //??????

function EventDetailsCard(props) {
	//{user, event, court, handleDeleteEvent}
	const { user, event, deleteEvent, court} = props
	return (
		<>
			<div className='EventList-grid'>
				<Card style={{ width: '18rem' }}>
					{/* <Card.Img variant="top" src="holder.js/100px180" /> */}
					<Card.Body>
						<Card.Title>{event.title}</Card.Title>
						<span>{event.date}</span><br />
						<span>{event.time}</span><br />
						<span>{event.createdBy.name}</span><br />
						{/* <NavLink className="test" to="/events/details"><button href="/event/details" className="button" >View Details</button></NavLink> */}
					</Card.Body>
					{user && (user._id === event.createdBy._id) &&
						<>
							<div className="up-del" >
								<Button
									variant="primary"
									type="submit"
									onClick={() => deleteEvent(event._id)}
								>Delete</Button>

								<Link
									to={{
										pathname: '/edit',
										state: { event }
									}}
								><Button variant="danger">Edit</Button></Link>
							</div>
						</>
					}
				</Card>
			</div>
		</>
	)
}
export default EventDetailsCard;