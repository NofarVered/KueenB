import React, { Component } from "react";
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
    if (isEmail(this.state.email)) {
      this.checkUserDetails(this.state.email, this.state.password);
      if (true) { // TODO: chnage this ! 
        //if email ans pass OK
        this.setState({
          email: e.target.value,
          emailError: 'Valid Email :)'
        });
      }
    }
    else {
      this.setState({
      emailError: 'Enter valid Email!'})
    }
  };

  checkUserDetails = (email, password) => {
    
    fetch(`http://localhost:3001/login?email=${email}&password=${password}`)
    .then(result =>result.json())
    .then(res => {this.props.handleLogin(email, res)});
  }
  

  render() {
    const allDetails = (this.state.email!=='' && this.state.password!=='');
    return (
      <div>
        <Link
          to={{
            pathname: "/calendar",
            state: this.state,
          }}
        />
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
        <form>
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
            <Link to={allDetails ? "/home" : "/"}>
              <button
                onClick={this.handleSubmit}
                className="loginButton"
              >
                  Login
              </button>
            </Link>
          </div>
          <div style={{height: "50px"}}/>
          <div className="box">
            Don't have an account?
            <Link to="/sign-up">
              <button
                onClick={this.handleSubmit}
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
