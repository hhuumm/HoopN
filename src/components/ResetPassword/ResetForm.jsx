import React, { Component } from "react";
import "./ResetForm.css";
import authService from "../../services/authService";

class ResetForm extends Component {
  state = {
    email: "",
  };

  handleChange = (e) => {
    this.props.updateMessage("");
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log(this.props, "PROPS");
  
    const { history, updateMessage, handleSignupOrLogin, match } = this.props;
    const token = match?.params?.token;
  
    if (!token) {
      console.error('Token is undefined');
      // Handle the error case, such as displaying an error message
      return;
    }
  
    try {
      const test = await authService.reset(this.state.email, token);
      console.log(test);
      // Handle the success case, such as displaying a success message
    } catch (err) {
      console.log(err);
      updateMessage(err.message);
      // Handle the error case, such as displaying an error message
    }
  };
  

  isFormInvalid() {
    const { email } = this.state;
    return (email === "");
  }

  render() {
    const { email } = this.state;
    return (
      <div className="Reset">
        <h2>Reset Password</h2>
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          <input
            type="text"
            autoComplete="on"
            placeholder="email"
            id="email"
            value={email}
            name="email"
            onChange={this.handleChange}
          />
           <br></br>
          <button className="button" to="/Main" disabled={this.isFormInvalid()}>Reset Password</button>
          
        </form>
      </div>
    );
  }
}

export default ResetForm;
