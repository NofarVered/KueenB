import React from "react";
import format from "date-fns/format";
import addDays from "date-fns/addDays";
import diffDays from "date-fns/differenceInCalendarDays";
import min from "date-fns/min";
import max from "date-fns/max";
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
        email:this.props.email,
        firstChoice: null, 
        secondChoice: null
    };

    onDateClick = day => {
        if (this.state.firstChoice==null){
            this.setState({
                firstChoice: day
            });
        }
        else if (this.state.secondChoice==null){
            this.setState({
                secondChoice: day
            });
        }
        else{
            this.setState({
                firstChoice: day,
                secondChoice: null
            });

        }
    };

    calcOfficeDays = (registersDays) => {
        let firstDate, secondDate;
        if (this.state.firstChoice == null && this.state.secondChoice == null){
            firstDate = new Date();
            secondDate = addDays(new Date(), 14);
        }
        else if (this.state.firstChoice != null && this.state.secondChoice != null){
            firstDate = min([this.state.firstChoice, this.state.secondChoice]);
            secondDate = max([this.state.firstChoice, this.state.secondChoice]);
        }
        else{// think about if one is null
            firstDate = this.state.firstChoice;
            secondDate = firstDate; 
        }
        let totalDays = diffDays(secondDate, firstDate);
        let i = 0;
        let cur_day = firstDate;
        let counter = 0;

        while(i <= totalDays){
            if (registersDays.indexOf(format(cur_day, "dd/MM/yyyy")) > -1){
                counter ++;
            }
            cur_day = addDays(cur_day,1);
            i++;
        }
        return counter;
    }   

    render() {
        let registersDays = this.state.daysList[this.state.email];
        let firstDate = (this.state.firstChoice && this.state.secondChoice) ? min([this.state.firstChoice, this.state.secondChoice]): null;
        let secondDate = (this.state.firstChoice && this.state.secondChoice) ? max([this.state.firstChoice, this.state.secondChoice]): null;

        let numOfRegisteredDays = (registersDays) ? this.calcOfficeDays(registersDays) : 0;
        let datesPresented = (secondDate != null && firstDate != null) ? format(firstDate, "dd.MM") + "-" + format(secondDate, "dd.MM") : null;
        console.log(this.state.firstChoice);
        console.log(this.state.secondChoice);
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
                <Calendar  onDateClick={this.onDateClick} registersDays={registersDays} first={new Date()} second={addDays(new Date(), 14)}></Calendar>
              </div>
              <div className="box-days">
                        <div className="daysWindow">

                            <p className="daysHeadline">{datesPresented} </p>
                            <div className="numOfDays">
                                {numOfRegisteredDays} office days
                            </div>        
                        </div>
                </div>
            </div>             
        );
    }
}

export default DaysInOffice;
