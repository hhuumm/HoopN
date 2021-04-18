import React from 'react';
import { Link } from "react-router-dom";
import './EventDetailsCard.css'
function EventDetailsCard(props) {
   //{user, event, court, handleDeleteEvent}
  const {user, event, court, handleDeleteEvent}=props
  console.log(props)
    return(
        <>
  <h1>Title:{event.title}</h1>
        
		</>
	)
} 


export default EventDetailsCard;