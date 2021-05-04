import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import healthLogo from "./health-statement.png";
import Klogo from "./Klogo.png";
import officeDays from "./office-days.PNG"
import register from "./register.PNG";
import { Link } from "react-router-dom";
import "./home.css";
import { HiArrowLeft } from "react-icons/hi";

class Home extends Component {
  state = {
    name: this.props.name,
    email: "",
    HS_Date: "",
    REG_Date: "",
  };

  handleSubmit = (e) => {
    // e.preventDefault();
    this.props.addUser(this.state);
  };

  render() {
    return (
      <div>
        <div className="head_box">
            <div className="arrow" onClick={this.handleSubmit}>
              <HiArrowLeft />
            </div>
          <div className="headpage">Office registration</div>
        </div>
        <Link
          to={{
            pathname: "/calendar",
            state: this.state,
          }}
        />
        <div className="box">
        <div className="home-header">
          <img
            className="navlogo"
            width="50px"
            height="50px"
            src={Klogo}
            alt="logo k health"
          />
          <h2 className="home-headline">
            Hi, {this.state.name} <button className="signupButton">Log out</button>
          </h2>
          <p className="p-home">What would like to do?</p>
        </div></div>
        <div className="home-body">
        <form>
          <div className="box">
            <Link to="/calendar">
              <Button
                onClick={this.handleSubmit}
                variant="light"
                className="nav-buttons"
              >
                <img src={register} className="btn_img" width="54px" height="45px" alt="" />
                <div className="btn_text">
                Register to a day in the office
                </div>
              </Button>
            </Link>
          </div>
          <div className="box">
            <Link to="/health-statement">
              <Button
                onClick={this.handleSubmit}
                variant="light"
                className="nav-buttons"
              >
                <img src={healthLogo} className="btn_img" width="45px" height="48px" alt="" />
                <div className="btn_text">
                Fill a health statement
                </div>
              </Button>
            </Link>
          </div>
          <div className="box">
            <Link to="/days-in-office">
              <Button
                  onClick={this.handleSubmit}
                  variant="light"
                  className="nav-buttons"
              >
                <img src={officeDays} className="btn_img" width="54px" height="45px" alt="" />
                <div className="btn_text">
                Check you office days
                </div>
              </Button>
            </Link>
          </div>
        </form>
        </div>
      </div>
    );
  }
}
export default Home;
