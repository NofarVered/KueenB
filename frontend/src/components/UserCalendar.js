import React from "react";
import format from "date-fns/format";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import {HiArrowLeft} from "react-icons/hi";
import {Link} from "react-router-dom";

import "./Calendar/calendar.css";
import Calendar from "./Calendar/Calendar";

class UserCalendar extends React.Component {
    state = {
        currentMonth: new Date(),
        selectedDate: new Date(),
        currentDay: new Date(),
        registersList: []
    };


    onDateClick = day => {
        this.setState({
            selectedDate: day,
            registersList: this.props.mapRegistersByDay[format(day, 
                "dd/MM/yyyy")]
        });
    };

    insertRegistryToDB = (async (email, name, hs, date)=> {
        const jsonRequest = {}
        jsonRequest.employees = {email: email, name: name, HS: hs, arrivalDate:date}
        console.log(jsonRequest);
        let result = await fetch("http://localhost:3001/registry", {method: "POST", 
                      headers: {"content-type": "application/json"}, body: JSON.stringify(jsonRequest) })
                      result = await result.json();
                      if (!result.success)  alert("FAILED! ")
    })

    onContinueClick = () =>{
        if (this.props.mapRegistersByDay[this.state.selectedDate] && 
            this.props.mapRegistersByDay[this.state.selectedDate].length>12){
            console.log("Day is full");
        }
        else{
            this.insertRegistryToDB(this.props.email, this.props.name, false, format(this.state.selectedDate, "dd/MM/yyyy"));
            console.log(this.props.email, this.props.name, false, format(this.state.selectedDate, "dd/MM/yyyy"));
        }
    }

    handleSubmit = (e) => {
        console.log(this.state);
        this.props.setSelectedDate(this.state.selectedDate);
    }

    render() {
        const dicValue = this.props.mapRegistersByDay[format(this.state.selectedDate, 
            "dd/MM/yyyy")];
            const maxPeople = 20;
        return (
            <div>
                <div className="headlineBox">
                    <Link to="/">
                            <div className="arrow" onClick={this.handleSubmit}>
                            <HiArrowLeft />
                            </div>
                            </Link>   
                    <h4 className="calendarHeadline">When are you coming?</h4>
                </div>  

                <Calendar onDateClick={this.onDateClick}></Calendar>
                <div className="box">
                        <div className="dayWindow">
                            <p className="dateHeadline">{format(this.state.selectedDate, "EEEE")}, {format(this.state.selectedDate, "dd.MM")}</p>
                            <div className="numOfRegisters">
                                {dicValue === undefined ? ("0 registered ("+ maxPeople+ " available)"): 
                                (dicValue.length+" registered ("+ maxPeople-(dicValue.length)+") available")}
                            </div>
                            <Link to="/registers">
                            <div className="registersButton" onClick={this.handleSubmit}>
                                See who registered
                                </div>
                            </Link>              
                        </div>
                </div>
                    <Button variant="primary" size="sm" onClick={this.onContinueClick}>
                        Continue
                    </Button>
            </div>
        );
    }
}

export default UserCalendar;
