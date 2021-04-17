import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
// import NavBar from "../../components/NavBar/NavBar";
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

class App extends Component {
  state = {
    user: authService.getUser(),latitude: null, longitude: null 

  };


  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
        success => this.setState({ latitude: success.coords.latitude, longitude: success.coords.longitude })
    );
}

//! in BINGE, used componentDidMount as part of the getAll movies function, may need that for our EventList (index/getAll) page - - may need to be combined with the component did mount above.
// async componentDidMount() {
//   const events = await eventAPI.getAll();
//   this.setState({ events })
// }

  handleLogout = () => {
    authService.logout();
    this.setState({ user: null });
    this.props.history.push("/");
  };

  handleSignupOrLogin = () => {
    this.setState({ user: authService.getUser() })
  }

  // handleAddEvent stubbed up based on BINGE app ... this will need to be updated
  handleAddEvent = async newEventData => {
    const newEvent = await eventAPI.create(newEventData);
    newEvent.addedBy = { name: this.state.user.name, _id: this.state.user._id }
    this.setState(state => ({
      events: [...state.events, newEvent]
    }), () => this.props.history.push('/events'));
  }

  handleDeleteEvent = async id => {
    if(authService.getUser()){
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
    updatedEvent.addedBy = {name: this.state.user.name, _id: this.state.user._id}
    const newEventsArray = this.state.events.map(e => 
        e._id === updatedEvent._id ?
        updatedEvent : e
    );
    this.setState(
      {events: newEventsArray},
      () => this.props.history.push('/events')
    );
  }

  render() {
    const {user} = this.state
    return (
      <>
        <NewNavBar user={this.state.user} handleLogout={this.handleLogout}/>
        {/* <NavBar user={this.state.user} handleLogout={this.handleLogout}/> */}
        <Route
          exact
          path="/"
          render={() => (
            <Landing user = {authService.getUser()} handleSignupOrLogin handleLogout loc = {this.state.loc} lat={this.state.lat}> </Landing>
          )}
        />
        <Route
        exact path="/Main"
        render={({ history }) => (
          <Main history={history}/>




        )}
        
        >



        </Route>
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
          render={({ history}) =>
            user ? <Users /> : <Redirect to="/login" />
          }
        />

        {/* ! create event route stubbed up based on BINGE app...this may need to be updated */}
        <Route exact path='/events/add' render={() => 
          authService.getUser() ?
            <CreateEvent 
              handleAddEvent = {this.handleAddEvent}
              user = {this.state.user}
            />
          :
            <Redirect to='/login' />
        }/>

        <Route exact path='/events' render={() =>
          authService.getUser() ?
            <EventList 
              events={this.state.events}
              user={this.state.user}
              handleDeleteEvent={this.handleDeleteEvent}
            />
          :
            <Redirect to='/login' />
        }/>

        <Route exact path='/edit' render={({location}) => 
          authService.getUser() ?
            <EditEvent 
              handleUpdateEvent={this.handleUpdateEvent}
              location={location}
              user={this.state.user}
            />
          :
            <Redirect to='/login'/>
        }/>
      </>
    );
  }
}

export default App;
