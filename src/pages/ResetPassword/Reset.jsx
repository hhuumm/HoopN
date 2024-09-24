import React, { Component } from 'react';
import ResetForm from '../../components/ResetPassword/ResetForm';
import './Reset.css';

class Reset extends Component {
  state = {
    message: ''
  }

  updateMessage = (msg) => {
    this.setState({message: msg});
  }

  render() {
    return (
      <main>
        <ResetForm match={this.props.match} updateMessage={this.updateMessage} handleSignupOrLogin={this.handleSignupOrLogin} />
        <p>{this.state.message}</p>
      </main>
    );
  }
}

export default Reset;