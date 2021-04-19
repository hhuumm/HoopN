import React from 'react';
import './SearchLocations.css'

function SearchLocations(props) {
   const {event,user,places} = props;

        return (
            <>
            <h1>This is locations</h1>
            <span>{user.name}</span>
            
                
    
            </>
        )
    }


export default SearchLocations;