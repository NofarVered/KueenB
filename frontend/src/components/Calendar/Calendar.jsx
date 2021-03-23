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

import "./calendar.css"

class Calendar extends React.Component {
    state = {
        currentMonth: new Date(),
        selectedDate: new Date(),
        currentDay: new Date(),
    };


    renderHeader() {
        const dateFormat = "MMMM yyyy";

        return (
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

        return <div className="days row">{days}</div>;
    }

    getCellClass(day, lastDay, calendarStart) {
        const { selectedDate, currentDay } = this.state;
        if (isPast(day, calendarStart) && !isSameDay(day, currentDay))  return "disabled";
        if (isAfter(day, lastDay)) return "disabled";
        if (isSameDay(day, selectedDate)) return "selected";
        return "";
    }
    renderCells() {
        const { currentMonth, currentDay } = this.state;
        const calendarStart = startOfWeek(currentMonth);
        const lastDay = addDays(currentDay, 11);
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
        return <div className="body">{rows}</div>;
    }


    onDateClick = day => {
        this.setState({
            selectedDate: day
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

    getCurrentDB = () => { //remove later
        fetch(`http://localhost:3001/registry`)
          .then(result =>result.json())
        //   .then((result) => this.setState({data: result}));
        .then(res => console.log(res));
      }

    onContinueClick = () =>{
        if (this.props.data.length>12){
            console.log("Day is full");
        }
        else{
            this.insertRegistryToDB(this.props.email, this.props.name, format(this.state.selectedDate, "dd/MM/yyyy"));
            this.getCurrentDB();
            
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
    
    countRegisters =() =>{
        let countDic={};
        let tmpData = this.state.data;
        for (let i=0; i<tmpData.length; i++){
            //tmpData[4] is the date column in the DB
            if (countDic[tmpData[4]]){
                countDic[tmpData[4]]++;
            }
            else{
                countDic[tmpData[4]]=1;
            }
        }
        return countDic;
    };
    render() {
        return (
            <div>
                <div className="headlineBox">
                    <p className="arrow"><HiArrowLeft /></p>
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
                        </div>
                </div>
                <Button variant="primary" size="sm" onClick={this.onContinueClick}>Continue</Button>
            </div>
        );
    }
}

export default Calendar;