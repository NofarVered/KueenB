import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./SignUpPage.css";
import { HiArrowLeft } from "react-icons/hi";

class SignUpPage extends Component {
  state = {
    name: "",
    password: "",
    email: "",
  };

  handleChange_name = (e) => {
    this.setState({
      name: e.target.value,
    });
    console.log(this.state.name);
  };

  handleChange_email = (e) => {
    this.setState({
      email: e.target.value,
    });
    console.log(this.state.email);
  };

  handleChange_password = (e) => {
    this.setState({
      email: e.target.value,
    });
    console.log(this.state.password);
  };

  handleSubmit = (e) => {
    this.props.addUser(this.state);
  };

  render() {
    return (
      <div>
        <Link
          to={{
            pathname: "/send-email",
            state: this.state,
          }}
        />
        <div className="head_box">
          <Link to="/">
            <div className="arrow" onClick={this.handleSubmit}>
              <HiArrowLeft />
            </div>
          </Link>
          <div className="headpage">Sign up</div>
        </div>
        <div className="signup-forms">
          <h2 className="headline">
            Sign up for office registration
          </h2>
        <form>
          <div className="box">
            <input
              className="forms"
              type="text"
              placeholder="Name"
              onChange={this.handleChange_name}
              value={this.state.name}
            />
          </div>
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
        </form>
          <div style={{height: "80px"}}/>
          <div className="box">
            <Link to="/send-email">
              <button
                onClick={this.handleSubmit}
                className="loginButton"
              >
                  Submit
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default SignUpPage;
