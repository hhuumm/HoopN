import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
// import NavBar from "../../components/NavBar/NavBar";
import NewNavBar from "../../components/NewNavBar/NewNavBar";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import Users from "../Users/Users"
import authService from "../../services/authService"
import "./App.css";
import Landing from '../Landing/Landing'
// import 'bootstrap/dist/css/bootstrap.min.css';
import * as eventAPI from '../../services/events-api'
import CreateEvent from '../CreateEvent/CreateEvent'

class App extends Component {
  state = {
    user: authService.getUser(),latitude: null, longitude: null 

  };


  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
        success => this.setState({ latitude: success.coords.latitude, longitude: success.coords.longitude })
    );
}

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

        

      </>
    );
  }
}

export default App;
