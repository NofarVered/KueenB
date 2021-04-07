import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./OfficeManager.css";
import Calendar from "../Calendar/Calendar.jsx";
import format from "date-fns/format";

class OfficeManager extends Component {
  state = {
    selectedDate: new Date(),
    registersList: [],
  };

  onDateClick = (day) => {
    this.setState({
      selectedDate: day,
      registersList: this.props.mapRegistersByDay[format(day, "dd/MM/yyyy")],
    });
  };

  componentDidMount() {}

  render() {
    let temp = {};
    console.log(typeof temp);
    const registersList = this.props.mapRegistersByDay[
      format(this.state.selectedDate, "dd/MM/yyyy")
    ];
    console.log(registersList);

    return (
      <div>
        <div className="manager_headpage">
          <h2>office manager page</h2>
          <div className="registers_list">
            {registersList ? (
              <ol>
                {registersList.map((item, index) => (
                  <li key={index} className={item.hs ? "black" : "red"}>
                    {item.name}
                  </li>
                ))}
              </ol>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="calendar_tab">
          <Calendar onDateClick={this.onDateClick}></Calendar>
        </div>
      </div>
    );
  }
}
export default OfficeManager;
