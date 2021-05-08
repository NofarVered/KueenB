import React from "react";
import format from "date-fns/format";
import "./Registers.css";
import { HiArrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import Headbox from "../Headbox/Headbox";

class Registers extends React.Component {
  render() {
    const date = format(this.props.selectedDate, "dd/MM/yyyy");
    let registersList = this.props.mapRegistersByDay[
      format(this.props.selectedDate, "dd/MM/yyyy")
    ];
    if (registersList) {
      registersList = registersList.map((item, index) => (
        <li key={index}>{item.name}</li>
      ));
    }
    return (
      <div>
        <Headbox headline={"Registers List"} linkTo={"/calendar"} date={date}/>
        <div className="contentPage">
          <ol>{registersList}</ol>
        </div>
      </div>
    );
  }
}

export default Registers;
