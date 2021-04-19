import React from "react";
import "./SearchLocations.css";
import LocationDetails from "../../components/LocationDetails/LocationDetails";
import {Link} from 'react-router-dom'
function SearchLocations(props) {
  const { event, user, places, weather,history } = props;
  const handler=(e)=>{console.log(e.id, '\n this is e');history.push({ pathname: '/location/details',props:{event}})}
  return (
    <>
      {places ? (
        <div>
          <span>Near by Parks</span><br />
          {places.map((park) => (
            <span>
              <Link to={{pathname: '/location/details', state: {park}}}>
              {park.name}
              </Link>
              <br></br>
            </span>
          ))}
        </div>
      ) : (
        <div>
          <img src="https://media.giphy.com/media/vZROLXfaqhbhHO8qwr/giphy.gif"></img>
        </div>
      )}
    </>
  );
}
export default SearchLocations;
