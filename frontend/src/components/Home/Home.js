import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import regLogo from "./register.png";
import healthLogo from "./health-statement.png";
import days_in_office_btn from "./days_in_office_btn.png"
import Klogo from "./Klogo.png";
import { Link } from "react-router-dom";
import "./home.css";

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
            Hi, {this.state.name}
          </h2>
        </div>
        <form>
          <div className="box">
            <Link to="/calendar">
              <Button
                onClick={this.handleSubmit}
                variant="light"
                className="nav-buttons"
              >
                <img src={regLogo} className="btn_img" width="45px" height="45px" alt="" />
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
                <img src={healthLogo} className="btn_img" width="45px" height="45px" alt="" />
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
                <img src={days_in_office_btn} className="btn_img" width="45px" height="45px" alt="" />
                <div className="btn_text">
                Check you office days
                </div>
              </Button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
export default Home;
