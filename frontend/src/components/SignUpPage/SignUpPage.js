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
    hidePassword: true,
  };




handleChange_name = (e) => {
    this.setState({
      name: e.target.value,
    });
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
    if (this.state.name!=='' && this.state.email!=='' && this.state.password!=='') {
      this.props.addUser(this.state);
      this.insertSignUpToDB(this.state.email, this.state.name, this.state.password);
    }
  };

  insertSignUpToDB = (async (email, name, password)=> {
    const jsonRequest = {}
    jsonRequest.employees = {email: email, name: name, password:password, verified:false}
    //console.log(jsonRequest);
    let result = await fetch("http://localhost:3001/sign-up", {method: "POST", 
                  headers: {"content-type": "application/json"}, body: JSON.stringify(jsonRequest) })
                  result = await result.json();
                  if (!result.success)  alert("FAILED! ")
})

  render() {
    const allDetails = (this.state.name!=='' && this.state.email!=='' && this.state.password!=='');
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
              type= {this.state.hidePassword ? "password" : "text"}
              placeholder="Password"
              onChange={this.handleChange_password}
              value={this.state.password}
            />
          </div>
        </form>
          <br/>
          <button className="sign-up-showPassword" onClick={(e)=>{e.preventDefault(); this.setState({hidePassword: !this.state.hidePassword})}}>Show Password</button>
          <div style={{height: "80px"}}/>
          <div className="box">
            <Link to= {allDetails ? "/send-email" : "/sign-up"}>
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
