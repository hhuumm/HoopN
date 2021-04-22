import tokenService from '../services/tokenService';
const BASE_URL = '/api/events/';

export function getLocationEvents(locationID)
{
    return fetch(BASE_URL+"location/"+locationID, {mode: "cors"})
    .then(res => res.json())
    .catch(err => console.error(err, 'err??') )

}
export function indexReviews(reviews) {
    return fetch(`${BASE_URL}${[reviews]}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${tokenService.getToken()}`
        },
        body: JSON.stringify(reviews)
    }, {mode: 'cors'})
    .then(res => res.json());
}

export function addParticipant(user,event)
{
    fetch(`${BASE_URL}addP/${user._id}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${tokenService.getToken()}`
        },
        body: JSON.stringify(user)
    }, {mode: 'cors'})
    .then(res => res.json());
}

export function createReview(review) {
    return fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${tokenService.getToken()}`
        },
        body: JSON.stringify(review)
        
    }, {mode: 'cors'})
    .then(res => res.json());
}
export function create(event) {
    return fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${tokenService.getToken()}`
        },
        body: JSON.stringify(event)
    }, {mode: 'cors'})
    .then(res => res.json());
}

//! This will get all events in the database, based on BINGE app function ...may need to change this to display only certain events, such as events at a certain location, or only events that a user has signed up for
export function getAll() {
    return fetch(BASE_URL, {mode: "cors"})
    .then(res => res.json())
    .catch(err => console.error(err, 'err??') )
}

export function myGames(id)
{
    return fetch(`${BASE_URL}${id}`, {
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + tokenService.getToken()}
  }, {mode: "cors"})
  .then(res => res.json());
}

export function deleteOne(id) {
    return fetch(`${BASE_URL}${id}`, {
          method: 'DELETE',
          headers: {'Authorization': 'Bearer ' + tokenService.getToken()}
    }, {mode: "cors"})
    .then(res => res.json());
  }

export function update(event) {
    return fetch(`${BASE_URL}${event._id}`, {
        method: 'PUT',
        headers: {'content-type': 'application/json', 'Authorization': 'Bearer ' + tokenService.getToken()},
        body: JSON.stringify(event)
    }, {mode: "cors"})
    .then(res => res.json());
}