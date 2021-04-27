import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Klogo from "../Home/Klogo.png";
import { Link } from "react-router-dom";
import "./LoginPage.css";

class LoginPage extends Component {
  state = {
    password: "",
    email: "",
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
    console.log(this.state);
    this.props.addUser(this.state);
  };

  render() {
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
          <div className="box">
            <input
              className="forms"
              type="text"
              placeholder="Password"
              onChange={this.handleChange_password}
              value={this.state.password}
            />
          </div>
          <div style={{height: "30px"}}/>
          <div className="box">
            <Link to="/home">
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
