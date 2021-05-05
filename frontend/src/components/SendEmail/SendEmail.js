import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import emailPic from "./email_envelope.png";
import { Link } from "react-router-dom";

class SendEmail extends Component {
  state = {
    email: window.location.href.split("/").pop(),
    valid: false,
    message: this.props.message,
  };

  componentDidMount() {
    this.verify(this.state.email);
    fetch(`http://localhost:3001/user-name?email=${this.state.email}`)
    .then((result) => result.json())
    .then(res => this.props.insertUserDetailsToAppState(this.state.email, res));
  }
  
  verify = (async (email)=> {
    const jsonRequest = {};
    jsonRequest.employee = { email: email};
    let result = await fetch("http://localhost:3001/sign-up", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(jsonRequest),
    });
    result = await result.json();
    if (!result.success) alert("FAILED! to verify ");
  })


  render() {
    console.log(this.state.email);
    return (
      <div>
        <div style={{height: "150px"}}/>
        <div className="box">
          <img
            width="140vw"
            height="90vw"
            src={emailPic}
            alt="emailPic"
          />
        </div>
        <div style={{height: "80px"}}/>
        <div className="box">
          {this.state.message}
        </div>
        </div>
    );
  }
}
export default SendEmail;
