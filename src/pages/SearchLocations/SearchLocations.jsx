import React from 'react';
import './SearchLocations.css'
import LocationCard from '../../components/LocationCard/LocationCard'

function SearchLocations(props) {
   const {event,user,places,weather} = props;
   
        return (
            <>
            {places ?
    <div>
        <span>Places??</span>
        {places.map(parks =>
        <span>
            {parks.name}
            <br></br> 
        </span> 
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


export default SearchLocations;