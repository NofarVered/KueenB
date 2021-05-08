import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import healthLogo from "./health-statement.PNG";
import officeDays from "./office-days.PNG"
import register from "./register.png";
import Klogo from "./Klogo.png";
import { Link } from "react-router-dom";
import "./home.css";
import { HiArrowLeft } from "react-icons/hi";
import Headbox from "../Headbox/Headbox";

class Home extends Component {
  state = {
    name: this.props.name,
  };

  render() {
    return (
      <div>
        <Headbox headline={"Office registration"}/>
        <div className="box">
          <div className="home-header">
            <img
              className="navlogo"
              width="50vw"
              height="50vw"
              src={Klogo}
              alt="logo k health"
            />
        <h2 className="home-headline">
            {`Hi, ${this.state.name}` }
        </h2>
        <p className="p-home">What would like to do?</p>
        </div></div>
        <div className="home-body">
        <form>
          <div className="box">
            <Link to="/calendar">
              <Button
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
                  variant="light"
                  className="nav-buttons"
              >
                <img src={officeDays} className="btn_img" width="54px" height="45px" alt="" />
                <div className="btn_text">
                Check your   office days
                </div>
              </Button>
            </Link>
          </div>
        </form>
          <Link to={"/"} onClick={this.props.logout}>LOG OUT</Link>
      </div>
    </div>
    );
  }
}
export default Home;
