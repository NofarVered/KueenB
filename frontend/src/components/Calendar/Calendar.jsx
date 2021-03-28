import React from "react";
import format from "date-fns/format";
import startOfWeek from "date-fns/startOfWeek";
import addDays from "date-fns/addDays";
import endOfWeek from "date-fns/endOfWeek";
import isSameDay from "date-fns/isSameDay";
import { parseJSON, isPast , isAfter} from 'date-fns'
import addMonths from "date-fns/addMonths";
import subMonths from "date-fns/subMonths";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import {HiArrowLeft} from "react-icons/hi";
import {Link} from "react-router-dom";
import {BrowserRouter as Router, Route} from "react-router-dom";

import "./calendar.css"
import Registers from "../Registers/Registers";

class Calendar extends React.Component {
    state = {
        currentMonth: new Date(),
        selectedDate: new Date(),
        currentDay: new Date(),
        registersList: []
    };

    renderHeader() {
        const dateFormat = "MMMM yyyy";

        return (
            <div className="box">
            <div className="header row flex-middle">
                <div className="col col-start">
                    <div className="icon" onClick={this.prevMonth}>
                        chevron_left
                    </div>
                </div>
                <div className="col col-center">
                    <span>{format(this.state.currentMonth, dateFormat)}</span>
                </div>
                <div className="col col-end" onClick={this.nextMonth}>
                    <div className="icon">chevron_right</div>
                </div>
                </div>
            </div>
        );
    }

    renderDays() {
        const days = [];
        const firstDOW = startOfWeek(new Date())
        const shortWeekDaysArray = Array.from(Array(7)).map((e, i) => format(addDays(firstDOW, i), 'EEEEEE'))


        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col col-center" key={i}>
                    {shortWeekDaysArray[i]}
                </div>
            );
        }

        return <div className="box"><div className="days row">{days}</div></div>;
    }

    getCellClass(day, lastDay, calendarStart) {
        const { selectedDate, currentDay } = this.state;
        if (format(day, "iiii")==="Friday" ||format(day, "iiii")==="Saturday") return "disabled";
        if (isPast(day, calendarStart) && !isSameDay(day, currentDay))  return "disabled";
        if (isAfter(day, lastDay)) return "disabled";
        if (isSameDay(day, selectedDate)) return "selected";
        return "available";
    }

    renderCells() {
        const { currentMonth, currentDay } = this.state;
        const calendarStart = startOfWeek(currentMonth);
        const lastDay = addDays(currentDay, 14);
        const calendarEnd = endOfWeek(lastDay);
        const startDate = startOfWeek(calendarStart);
        const endDate = endOfWeek(calendarEnd);

        const dateFormat = "d";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;
                const parsed = parseJSON(cloneDay)
                days.push(
                    <div
                        className={`col cell ${this.getCellClass(day, lastDay, calendarStart)}`}
                        key={day}
                        onClick={() => this.onDateClick(parsed)}
                    >
                        <span className="number">{formattedDate}</span>
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div className="row" key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="box"><div className="body">{rows}</div></div>;
    }


    onDateClick = day => {
        this.setState({
            selectedDate: day,
            registersList: this.props.mapRegistersByDay[format(day, 
                "dd/MM/yyyy")]
        });
    };

    insertRegistryToDB = (async (email, name, date)=> {
        const jsonRequest = {}
        jsonRequest.employees = {email: email, name: name, HS: false, arrivalDate:date}
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
            this.insertRegistryToDB(this.props.email, this.props.name, format(this.state.selectedDate, "dd/MM/yyyy"));
            console.log(this.props.email, this.props.name, false, format(this.state.selectedDate, "dd/MM/yyyy"));
        }
    }

    nextMonth = () => {
        this.setState({
            currentMonth: addMonths(this.state.currentMonth, 1)
        });
    };

    prevMonth = () => {
        this.setState({
            currentMonth: subMonths(this.state.currentMonth, 1)
        });
    };


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

                <div className="calendar">
                    {this.renderHeader()}
                    {this.renderDays()}
                    {this.renderCells()}
                </div>
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
                    {/* <div>
                    <Registers registersList ={this.props.mapRegistersByDay} selectedDate={this.state.selectedDate} />
                    </div> */}
            </div>
        );
    }
}

export default Calendar;