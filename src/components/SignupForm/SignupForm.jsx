import React, { Component } from "react";
import "./SignupForm.css";
import authService from "../../services/authService";

class SignupForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    passwordConf: "",
  };

  handleChange = (e) => {
    this.props.updateMessage("");
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    const { history, updateMessage, handleSignupOrLogin } = this.props;
    e.preventDefault();
    try {
      await authService.signup(this.state);
      handleSignupOrLogin()
      history.push("/");
    } catch (err) {
      updateMessage(err.message);
    }
  };

  isFormInvalid() {
    const { name, email, password, passwordConf } = this.state;
    return !(name && email && password === passwordConf);
  }

  render() {
    const { name, email, password, passwordConf } = this.state;
    return (
      <div className="Signup">
        <h2>Sign Up</h2>
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          <input
            type="text"
            autoComplete="on"
            placeholder="name"
            id="name"
            value={name}
            name="name"
            onChange={this.handleChange}
          />
          <br></br>
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
          <input
            type="password"
            autoComplete="off"
            placeholder="password"
            id="password"
            value={password}
            name="password"
            onChange={this.handleChange}
          />
         <br></br>
          <input
            type="password"
            autoComplete="off"
            placeholder="confirm password"
            id="confirm"
            value={passwordConf}
            name="passwordConf"
            onChange={this.handleChange}
          />
           <br></br>
          <button className="button" disabled={this.isFormInvalid()}>Sign Up</button>
          
        </form>
      </div>
    );
  }
}

export default SignupForm;
