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


class App extends Component {
  state = {
    user: authService.getUser(), latitude: null, longitude: null,
    events: [],
    weather: null,
    places:null
  };
  async componentDidMount() {
    const events = await eventAPI.getAll();

    // let wthr=apiService.default.getWeatherL(success.coords.latitude,success.coords.longitude)
    // this.setState({ events })
    window.navigator.geolocation.getCurrentPosition(
      success => {
        // console.log(success)
       
        this.setState({ events,latitude: success.coords.latitude, longitude: success.coords.longitude })
    
      },err=>{this.setState({events})}
    )
   
  }

async componentDidUpdate(previousProps,previousState){
  console.log(this.state.latitude,this.state.latitude,"\n^^ Lat n Lng")
  console.log(previousState,"\n^^Previous State")

  if(previousState.latitude !== this.state.latitude)
  {
    let weather= await apiService.default.getWeatherL(this.state.latitude,this.state.longitude)
    let places = await apiService.default.getPlacesL(this.state.latitude,this.state.longitude)
    
    console.log(weather)
    this.setState({weather,places})
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
    newEvent.createdBy = { name: this.state.user.name, _id: this.state.user._id }
    this.setState(state => ({
      // console.log(state)
      selectedEvent: newEvent,
      events: [...state.events, newEvent]
    }), () => this.props.history.push('/events/details'));
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

  render() {
    const { user, events,weather } = this.state
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
            <Main history={history} weather={weather} />
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
        <Route exact path='/events/add' render={() =>
          authService.getUser() ?
            <CreateEvent
              handleAddEvent={this.handleAddEvent}
              user={this.state.user}
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
      </>
    );
  }
}

export default App;