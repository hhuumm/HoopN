import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import NewNavBar from "../../components/NewNavBar/NewNavBar";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import Users from "../Users/Users"
import Main from "../Main/Main"
import authService from "../../services/authService"
import "./App.css";
import Landing from '../Landing/Landing'
// import 'bootstrap/dist/css/bootstrap.min.css';
import * as eventAPI from '../../services/events-api'
import * as apiService from '../../services/apiService'
import CreateEvent from '../CreateEvent/CreateEvent'
import EventList from '../EventList/EventList'
import EditEvent from '../EditEvent/EditEvent'
import EventDetails from "../EventDetails/EventDetails";
import EventReviews from "../EventReviews/EventReviews"
import SearchLocations from '../SearchLocations/SearchLocations'
import LocationDetails from '../../components/LocationDetails/LocationDetails'
import { getTimeFromTimestamp, getWindDirection } from '../../services/utils';


class App extends Component {
  state = {
    user: authService.getUser(), latitude:'', longitude: '',
    events: [],
    weather: null,
    places: null,
    windDirection: '',
    sunrise: '',
    sunset: ''
  };
  async componentDidMount() {
    const events = await eventAPI.getAll();

    // let wthr=apiService.default.getWeatherL(success.coords.latitude,success.coords.longitude)
    // this.setState({ events })
    window.navigator.geolocation.getCurrentPosition(
      success => {
        console.log(success)
       
        this.setState({ events,latitude: success.coords.latitude, longitude: success.coords.longitude })
    
      },err=>{this.setState({events})}
    )
   
  }

async componentDidUpdate(previousProps,previousState){
  console.log(this.state.latitude,this.state.longitude,"\n^^ Lat n Lng")
  console.log(previousState,"\n^^Previous State")

  if(previousState.latitude !== this.state.latitude)
  {
    console.log('here')
    let weather= await apiService.default.getWeatherL(this.state.latitude,this.state.longitude)
    let windDirection= await getWindDirection(weather.wind.deg)
    let sunrise = await getTimeFromTimestamp(weather.sys.sunrise);
    let sunset = await getTimeFromTimestamp(weather.sys.sunset);
    let places = await apiService.default.getPlacesL(this.state.latitude,this.state.longitude)
    
    console.log(weather)
    this.setState({weather, windDirection, places, sunset, sunrise})
  }
}

  // in BINGE, used componentDidMount as part of the getAll movies function, may need that for our EventList (index/getAll) page - - may need to be combined with the component did mount above.
  // async componentDidMount() {
  //   const events = await eventAPI.getAll();
  //   this.setState({ events })
  // }
  handleShow=()=>{console.log("Show has been clicked")}
  

  handleLogout = (props) => {
    authService.logout();
    this.setState({ user: null });
    this.props.history.push("/");
  };
  handleSignupOrLogin = () => {
    this.setState({ user: authService.getUser() })
  }
  handleAddEvent = async newEventData => {
    const newEvent = await eventAPI.create(newEventData);
    this.setState(state => ({
      // console.log(state)
      selectedEvent: newEvent,
      events: [...state.events, newEvent]
    }), () => this.props.history.push({
        pathname:'/events/details',
        event:newEvent
      }));
  }
  handleDeleteEvent = async id => {
    if (authService.getUser()) {
      await eventAPI.deleteOne(id);
      this.setState(state => ({
        events: state.events.filter(m => m._id !== id)
      }), () => this.props.history.push('/events'));
    } else {
      this.props.history.push('/login')
    }
  }
  handleGetEvents=(eventID)=>{
    return eventAPI.getLocationEvents(eventID)
  }

  handleUpdateEvent = async updatedEventData => {
    const updatedEvent = await eventAPI.update(updatedEventData);
    updatedEvent.createdBy = { name: this.state.user.name, _id: this.state.user._id }
    const newEventsArray = this.state.events.map(e =>
      e._id === updatedEvent._id ? updatedEvent : e
    );
    this.setState(
      { events: newEventsArray },
      () => this.props.history.push('/events')
    );
  }
 

  handleAddReview = async newReviewData => {
    const newReview = await eventAPI.createReview(newReviewData);
    this.setState(state => ({
      // console.log(state),
      selectedReview: newReview,
      reviews: [state.events.reviews, newReview]
    }), () => this.props.history.push({pathname:'/events/details',event:this.state.event}));
  }


  render() {
    const { user, events, weather } = this.state
    const {history}=this.props
    return (
      <>
        <NewNavBar user={this.state.user} handleLogout={this.handleLogout} />

        <Route
          exact
          path="/"
          render={() => (
            <Landing user={authService.getUser()} handleSignupOrLogin handleLogout loc={this.state.loc} lat={this.state.lat}></Landing>
          )}
        />

        <Route
          exact path="/Main"
          render={({ history }) => (
            <Main
              history={history}
              weather={weather}
              windDirection={this.state.windDirection}
              sunrise={this.state.sunrise}
              sunset={this.state.sunset}
            />
            
          )}
        />

        <Route
          exact
          path="/signup"
          render={({ history }) => (
            <Signup
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          )}
        />

        <Route
          exact
          path="/login"
          render={({ history }) => (
            <Login
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          )}
        />

        <Route
          exact
          path="/users"
          render={({ history }) =>
            user ? <Users /> : <Redirect to="/login" />
          }
        />

        <Route exact path='/events/add' render={({ history, location }) =>
          authService.getUser() ?
            <CreateEvent
              handleAddEvent={this.handleAddEvent}
              user={this.state.user}
              history={history}
              location={location}

            />
            :
            <Redirect to='/login' />
        } />

        <Route
          exact
          path="/events/details"
          render={({ history }) => (
            <EventDetails
              history={history}
              update={this.handleUpdateEvent}
              user={this.state.user}
              delete={this.handleDeleteEvent}
            />
          )}
        />

        <Route exact path='/events' render={() =>
          <EventList
            events={this.state.events}
            user={this.state.user}
            handleDeleteEvent={this.handleDeleteEvent}
            history={history}
            handleShow={this.handleShow}
            places ={this.state.places}
          />
        } />
        <Route exact path='/myEvents' render={() =>
          <EventList
            events={this.state.events}
            user={this.state.user}
            handleDeleteEvent={this.handleDeleteEvent}
            myEvent={true}
          />
        } />
        <Route exact path='/edit' render={({ location }) =>
          authService.getUser() ?
            <EditEvent
              handleUpdateEvent={this.handleUpdateEvent}
              location={location}
              user={this.state.user}
            />
            :
            <Redirect to='/login' />
        } />

        <Route exact path='/events/review' render={({ location, history }) => 
            authService.getUser() ?
              <EventReviews
                handleAddReview={this.handleAddReview}
                history={history}
                location={location}
                user={this.state.user}
              />
            :
            <Redirect to='/login' />
        } />

        <Route
          exact
          path="/locations"
          render={() => (
            <SearchLocations
              user={this.state.user}
              events={this.state.events}
              places={this.state.places}
              weather={this.state.weather}
              history={history}
            />
          )}
        />

        <Route
          exact
          path="/location/details"
          render={({location}) => (
            <LocationDetails
              user={this.state.user}
              events={this.state.events}
              places={this.state.places}
              weather={this.state.weather}
              history={history}
              location={location}
            />
          )}
        />

      </>
    );
  }
}

export default App;