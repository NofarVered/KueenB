import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import emailPic from "./email_envelope.png";
import { Link } from "react-router-dom";

class SendEmail extends Component {
  state = {
    email: window.location.href.split("/").pop(),
    valid: false
  };

  componentDidMount(){
    console.log(this.state.email);
    this.verify(this.state.email);
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
          Check your mail box and click the link attached
        </div>
        <div style={{height: "80px"}}/>
        <div className="box">
          <Link to="/">
            <button
              onClick={this.handleSubmit}
              className="signupButton"
            >
              Back to home page
            </button>
          </Link>
        </div>
        </div>
    );
  }
}
export default SendEmail;
