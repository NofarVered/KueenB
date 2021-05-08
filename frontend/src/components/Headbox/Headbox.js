import React, { Component } from "react";
import { Link } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import "./Headbox.css"

class Headbox extends Component{
    state = {
      headline: this.props.headline,
      linkTo: this.props.linkTo,
      date: this.props.date,
  }
    render(){
      return(
        <div className="head_box1">
          <Link to={this.state.linkTo}>
            <div style={this.state.linkTo ? null:{display:"none"}} className="arrow">
              <HiArrowLeft />
            </div>
          </Link>
          <div className="headpage">{this.state.headline}</div>
          <div className="dateFill">{this.state.date ? this.state.date : null}</div>
        </div>
      );
    }

}
export default Headbox;