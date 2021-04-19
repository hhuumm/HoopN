import React from "react";
import "./SearchLocations.css";
import LocationDetails from "../../components/LocationDetails/LocationDetails";

function SearchLocations(props) {
  const { event, user, places, weather,history } = props;
  const handler=(e)=>{console.log(e.id, '\n this is e');history.push({ pathname: '/location/details',props:{event}})}

  return (
    <>
      {places ? (
        <div>
          <span>Places??</span>
          {places.map((parks) => (
            <span>
              <button onClick={handler} id={parks._id}>{parks.name}</button>
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
