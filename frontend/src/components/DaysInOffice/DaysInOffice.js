import React from "react";
import format from "date-fns/format";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../Calendar/calendar.css";
import Calendar from "../Calendar/Calendar";

class DaysInOffice extends React.Component {
    state = {
        currentMonth: new Date(),
        selectedDate: new Date(),
        currentDay: new Date(),
        daysList: this.props.mapDaysByRegister,
        email:this.props.email
    };


    onDateClick = day => {
        console.log ("change this function")
    };
    

    render() {
        let registersDays = this.state.daysList[this.state.email];
        console.log(registersDays);
        return (
            <div>
                <Calendar onDateClick={this.onDateClick}></Calendar>
            </div>             
        );
    }
}

export default DaysInOffice;
