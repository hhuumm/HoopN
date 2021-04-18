import React from 'react';
import { Link } from "react-router-dom";
function EventDetailsCard({user, event, court, handleDeleteEvent}) {
    return(
        <>
        <div className="card-content">
					<span className="card-title activator grey-text text-darken-4">
						{event.title}<i className="material-icons right">more_vert</i>
					</span>
					<p>{event.createdBy.name}</p>
				</div>
                <div className="card-reveal">
					<span className="card-title grey-text text-darken-4">
						{event.title}<i className="material-icons right">close</i>
					</span>
					<h6>Created By:  {event.createdBy.name}</h6>
					<h6>Location: {event.location.name}</h6>
					<div>Participants:  {event.participant}</div>
					<div>Court:  {court.name}</div>
                    <div>Reviews:  {event.location.reviews}</div>
					
					{user && (user._id === event.createdBy._id) &&
						<>
							<button 
								type="submit"
								className="btn red"
								onClick={() => handleDeleteEvent(event._id)}
							>
								<i className="material-icons left">delete</i>    
								Delete Event
							</button>
							<Link 
								className="btn yellow black-text"
								to={{
									pathname: '/edit',
									state: {event}
								}}
							>
								<i className="material-icons left">build</i>
								Edit Event
							</Link>
						</>
					}
				</div>
    
		</>
	)
} 


export default EventDetailsCard;