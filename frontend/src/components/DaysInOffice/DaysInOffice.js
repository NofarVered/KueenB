import React from "react";
// import format from "date-fns/format";
import 'bootstrap/dist/css/bootstrap.min.css';
import { HiArrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import Calendar from "../Calendar/Calendar";
import "./DaysInOffice.css";

class DaysInOffice extends React.Component {
    state = {
        currentMonth: new Date(),
        selectedDate: new Date(),
        currentDay: new Date(),
        daysList: this.props.mapDaysByRegister,
        email:this.props.email
    };

    onDateClick = day => {
        //change !
    };
    
    render() {
        let registersDays = this.state.daysList[this.state.email];
        console.log(registersDays);

        return (
            <div>
                {/* the head box of this page: */}
                <div className="head_box_office_days">
                    <h1 className="head_line_office_days">Check Office Days</h1>
                    <h5 className="second_line">Select a date range</h5>
                    <Link to="/">
                        <div className="arrow">
                        <HiArrowLeft />
                        </div>
                    </Link>
               </div> 
              <div className="calender_office_days">
                <Calendar onDateClick={this.onDateClick} registersDays={registersDays}></Calendar>
              </div>
            </div>             
        );
    }
}

export default DaysInOffice;
