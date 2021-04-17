import React, { Component} from "react";
import { Link } from "react-router-dom";
import authService from "../../services/authService"
import "./Login.css";

class LoginPage extends Component {
  state = {
    email: "",
    pw: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    const { history, handleSignupOrLogin } = this.props;
    e.preventDefault();
    try {
      await authService.login(this.state);
      handleSignupOrLogin()
      history.push("/Main");
    } catch (err) {
      alert("Invalid Credentials!")
    }
  };

  render() {
    const {email, pw} = this.state
    return (
      <main className="Login">
        <h2>Log In</h2>
        <form autoComplete="off" onSubmit={this.handleSubmit}>
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
            value={pw}
            name="pw"
            onChange={this.handleChange}
          />
          <br></br>
          <span>No account yet? </span>
          <Link className="sign-up-link" to="/signup">
            Sign Up
          </Link>
          <br></br>
          <button className="button">Log In</button>
          <br></br>
        </form>
      </main>
    );
  }
}

export default LoginPage;
