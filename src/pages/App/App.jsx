import "./App.css";
import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import NewNavBar from "../../components/NewNavBar/NewNavBar";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import Users from "../Users/Users"
import Main from "../Main/Main"
import authService from "../../services/authService"
import Landing from '../Landing/Landing'
import * as eventAPI from '../../services/events-api'
import * as apiService from '../../services/apiService'
import CreateEvent from '../CreateEvent/CreateEvent'
import EventList from '../EventList/EventList'
import MyEventsList from '../MyEventsList/MyEventsList'
import EditEvent from '../EditEvent/EditEvent'
import EventDetails from "../EventDetails/EventDetails";
import SearchLocations from '../SearchLocations/SearchLocations'
import LocationDetails from '../../components/LocationDetails/LocationDetails'
import { getTimeFromTimestamp, getWindDirection } from '../../services/utils';


class App extends Component {
  state = {
    user: authService.getUser(), latitude: '', longitude: '',
    events: [],
    weather: null,
    places: null,
    windDirection: '',
    sunrise: '',
    sunset: ''
  };
  async componentDidMount() {
    const events = await eventAPI.getAll();
    let lat;
    let lng;
    window.navigator.geolocation.getCurrentPosition(
      success => {
        lat = success.coords.latitude; lng = success.coords.longitude;
        this.setState({ events, latitude: success.coords.latitude, longitude: success.coords.longitude })
      }
    )
  }

  async componentDidUpdate(previousProps, previousState) {

    if (previousState.latitude !== this.state.latitude) {
      let weather = await apiService.default.getWeatherL(this.state.latitude, this.state.longitude)
      console.log(weather, "weather");
      let windDirection = await getWindDirection(weather.wind.deg)
      let sunrise = await getTimeFromTimestamp(weather.sys.sunrise);
      let sunset = await getTimeFromTimestamp(weather.sys.sunset);
      let places = await apiService.default.getPlacesL(this.state.latitude, this.state.longitude)

      this.setState({ weather, windDirection, places, sunset, sunrise })
      console.log(places, "here");
    }
  }


  handleLogout = (props) => {
    authService.logout();
    this.setState({ user: null });
    this.props.history.push("/");
  }

  handleSignupOrLogin = () => {
    this.setState({ user: authService.getUser() })
  }

  handleAddEvent = async newEventData => {
    const newEvent = await eventAPI.create(newEventData)
      .then(response => { return response })
    const newEvents = await eventAPI.getAll();

    this.setState(({
      events: newEvents
    }));
    this.props.history.push(`/events/details/${newEvent._id}`)

  }

  handleDeleteEvent = async id => {
    if (authService.getUser()) {
      await eventAPI.deleteOne(id);
      const newEventsArray = await eventAPI.getAll();
      this.setState(
        { events: newEventsArray }
      );
      this.props.history.push('/events');
    } else {
      this.props.history.push('/login')
    }
  }

  handleGetEvents = (eventID) => {
    return eventAPI.getLocationEvents(eventID)
  }

  handleUpdateEvent = async updatedEventData => {
    console.log(updatedEventData, "\n^^This is us trying to update the data")
    const updatedEvent = await eventAPI.update(updatedEventData);
    const newEventsArray = await eventAPI.getAll();
    this.setState(
      { events: newEventsArray }
    );
    // () => this.props.history.push('/events')
    this.props.history.push(`/events/details/${updatedEvent._id}`)
  }

  handleAddReview = async newReviewData => {
    const newReview = await eventAPI.createReview(newReviewData);
    this.setState(state => ({
      places: this.state.places,
      selectedReview: newReview,
      reviews: [state.events.reviews, newReview]
    }), () => this.props.history.push('/events/details'));
  }

  handleAddPlayer = async newPlayerData => {
    const newPlayer = await eventAPI.addParticipant(newPlayerData);
    this.setState(state => ({
      // console.log(state),
      player: newPlayer,
      participant: [state.events.participant, newPlayer]
    }), () => this.props.history.push('/events/details'));
  }
  render() {

    const { user, events, weather, places } = this.state
    const { history } = this.props

    return (
      <>
        <NewNavBar
          user={this.state.user}
          handleLogout={this.handleLogout}
        />
        <Route
          exact path="/"
          render={() => (
            <Landing
              user={authService.getUser()}
              handleSignupOrLogin
              handleLogout
              loc={this.state.loc}
              lat={this.state.lat}
            ></Landing>
          )}
        />
        <Route
          exact path="/Main"
          render={({ history }) =>
            authService.getUser() ?
              <Main
                history={history}
                weather={weather}
                windDirection={this.state.windDirection}
                sunrise={this.state.sunrise}
                sunset={this.state.sunset}
                user={this.state.user}
              />
              :
              <Redirect to='/login' />
          }
        />
        <Route
          exact path="/signup"
          render={({ history }) => (
            <Signup
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          )}
        />
        <Route
          exact path="/login"
          render={({ history }) => (
            <Login
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          )}
        />
        <Route
          exact path="/users"
          render={({ history }) => authService.getUser() ?
            <Users />
            :
            <Redirect to="/login" />
          }
        />
        <Route
          exact path='/events/add'
          render={({ history, location }) => authService.getUser() ?
            <CreateEvent
              handleAddEvent={this.handleAddEvent}
              user={this.state.user}
              history={history}
              location={location}
              places={this.state.places}
            />
            :
            <Redirect to='/login' />
          }
        />

        <Route
          exact path="/events/details/:id"
          render={({ history }) =>
            authService.getUser() ?
              <EventDetails
                events={this.state.events}
                history={history}
                update={this.handleUpdateEvent}
                user={this.state.user}
                delete={this.handleDeleteEvent}
                places={this.state.places}
                handleAddPlayer={this.handleAddPlayer}
              />
              :
              <Redirect to='/login' />
          }
        />
        <Route
          exact path='/events'
          render={() =>
            authService.getUser() ?
              <EventList
                events={this.state.events}
                user={this.state.user}
                handleDeleteEvent={this.handleDeleteEvent}
                history={history}
                handleShow={this.handleShow}
                places={this.state.places}
                weather={weather}
              />
              :
              <Redirect to='/login' />
          }
        />
        <Route
          exact path='/myEvents'
          render={() =>
            authService.getUser() ?
              <MyEventsList
                events={this.state.events}
                user={this.state.user}
                handleDeleteEvent={this.handleDeleteEvent}
                myEvent={true}
                places={this.state.places}
              />
              :
              <Redirect to='/login' />
          }
        />
        <Route
          exact path='/edit'
          render={({ location }) =>
            authService.getUser() ?
              <EditEvent
                handleUpdateEvent={this.handleUpdateEvent}
                location={location}
                user={this.state.user}
              />
              :
              <Redirect to='/login' />
          }
        />
        <Route
          exact path="/locations"
          render={() =>
            authService.getUser() ?
              <SearchLocations
                user={this.state.user}
                events={this.state.events}
                places={this.state.places}
                weather={this.state.weather}
                history={history}
                getPhoto={apiService.default.getPhoto}
              />
              :
              <Redirect to='/login' />
          }
        />
        <Route
          exact path="/location/details"
          render={({ location }) =>
            authService.getUser() ?
              <LocationDetails
                user={this.state.user}
                events={this.state.events}
                places={this.state.places}
                weather={this.state.weather}
                history={history}
                location={location}
              />
              :
              <Redirect to='/login' />
          }
        />
      </>
    );
  }
}

export default App;

