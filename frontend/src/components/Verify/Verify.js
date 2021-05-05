import React, { Component } from "react";
import SendEmail from "../SendEmail/SendEmail";
import { Link } from "react-router-dom";

class Verify extends Component {

  render() {
    return (
      <div>
   <SendEmail message={"Your mail was verified"}  insertUserDetailsToAppState={this.props.insertUserDetailsToAppState}/>
        <div style={{height: "80px"}}/>
        <div className="box">
          <Link to="/home">
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

export default Verify;