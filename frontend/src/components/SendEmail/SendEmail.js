import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import emailPic from "./email_envelope.png";
import { Link } from "react-router-dom";

class SendEmail extends Component {
  state = {
    send: false,
  };

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
