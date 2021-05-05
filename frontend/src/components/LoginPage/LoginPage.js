import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Klogo from "../Home/Klogo.png";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import isEmail from 'validator/lib/isEmail';

class LoginPage extends Component {
  state = {
    password: "",
    email: "",
    name: "",
    hidePassword: true,
    loginOK: null
  };

  handleChange_email = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handleChange_password = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (isEmail(this.state.email)) {
      this.checkUserDetails(this.state.email, this.state.password);
    } else this.setState({ emailError: 'Email or Password incorrect'});
  };

  checkUserDetails = (email, password) => {
    fetch(`http://localhost:3001/login?email=${email}&password=${password}`)
    .then(result =>result.json())
    .then(name => {
      if(name) {
        this.props.handleLogin(email, name);
        localStorage.setItem('email' , email);
        this.setState({loginOK: true}) 
      } else {
        this.setState({ emailError: 'Email or Password incorrect'})
      }
    });
  }
  

  render() {
    if (this.state.loginOK) {
      return <Redirect to="/home" />;
    }
    return (
      <div>
        <div className="box">
          <img
            className="navlogo"
            width="90vw"
            height="90vw"
            src={Klogo}
            alt="logo k health"
          />
        </div>
        <div className="box">
          <h2 className="headline" width="270px" height="45px">
            Office registration
          </h2>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="box">
            <input
              className="forms"
              type="text"
              placeholder="Email"
              onChange={this.handleChange_email}
              value={this.state.email} 
            />
          </div>
          <div className = "error">{this.state.emailError}</div>
          <div className="box">
            <input
              className="forms"
              type= {this.state.hidePassword ? "password" : "text"}
              placeholder="Password"
              onChange={this.handleChange_password}
              value={this.state.password}
            />
          </div>
          <br/>
          <button className="login-showPassword" onClick={(e)=>{e.preventDefault(); this.setState({hidePassword: !this.state.hidePassword})}}>Show Password</button>
          <br/>
          <div className="box">
              <button
                type="submit"
                className="loginButton"
              >
                  Login
              </button>
          </div>
          <div style={{height: "50px"}}/>
          <div className="box">
            Don't have an account?
            <Link to="/sign-up">
              <button
                className="signupButton"
              >
                  sign up
              </button>          
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
export default LoginPage;
