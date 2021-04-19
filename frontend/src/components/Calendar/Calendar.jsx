import React from "react";
import format from "date-fns/format";
import startOfWeek from "date-fns/startOfWeek";
import addDays from "date-fns/addDays";
import endOfWeek from "date-fns/endOfWeek";
import isSameDay from "date-fns/isSameDay";
import { parseJSON, isPast, isAfter } from "date-fns";
import addMonths from "date-fns/addMonths";
import subMonths from "date-fns/subMonths";
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import getMonth from 'date-fns/getMonth';
import "bootstrap/dist/css/bootstrap.min.css";

import "./calendar.css";

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    currentDay: new Date(),
    registersList: [],
    isAvailable: true,
    registersDays: Array.isArray(this.props.registersDays) ? this.props.registersDays:[],
    graychoice1:  Array.isArray(this.props.registersDays) ? this.props.first: null,
    graychoice2: Array.isArray(this.props.registersDays) ? this.props.second: null 

  };

  onDateClick = (day, className) => {
    if (className === "disabled") {
      this.setState({
        isAvailable: false,
      });
    } 
    else {
      if (this.state.registersDays.length){
        if ( this.state.graychoice1!=null && this.state.graychoice2===null){
        this.setState(
          {
            graychoice2: day
          },
          () => {this.props.onDateClick(day); }
        );
        }

        else{
          this.setState(
            {
              graychoice1: day,
              graychoice2: null
            },
            () => {this.props.onDateClick(day,className); }
          );

        }
       }
      else{
        this.setState(
          {
            selectedDate: day,
          },
          () => {this.props.onDateClick(day); }
        );
  
      }
    }
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
    const firstDOW = startOfWeek(new Date());
    const shortWeekDaysArray = Array.from(Array(7)).map((e, i) =>
      format(addDays(firstDOW, i), "EEEEEE")
    );

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {shortWeekDaysArray[i]}
        </div>
      );

    }

    return (
      <div className="box">
        <div className="days row">{days}</div>
      </div>
    );
  }

  getCellClass(day, lastDay, calendarStart) {
    const { selectedDate, currentDay } = this.state;
    if (this.state.registersDays.length){

      if (isSameDay(this.state.graychoice1, day) ){
        return "selected_office_day";
      }
      else if (isSameDay(this.state.graychoice2, day) ){
        return "selected_office_day";
      }
      else if (this.state.registersDays.indexOf(format(day, "dd/MM/yyyy")) > -1){
        if (this.state.graychoice1!=null && 
        this.state.graychoice2!=null && (
          (day>this.state.graychoice1 && day<this.state.graychoice2) || 
          ( day>this.state.graychoice2 && day<this.state.graychoice1)
          ))
          return "between_selected";
        return "selected";
      }
      else if (this.state.graychoice1!=null && 
        this.state.graychoice2!=null && (
          (day>this.state.graychoice1 && day<this.state.graychoice2) || 
          ( day>this.state.graychoice2 && day<this.state.graychoice1)
          )){
            return "between"
          }
      else{
        return "disabled_office_day";
      }
    }
    if (format(day, "iiii") === "Friday" || format(day, "iiii") === "Saturday")
      return "disabled";
    if (isPast(day, calendarStart) && !isSameDay(day, currentDay))
      return "past";
    if (isAfter(day, lastDay) || isAfter(day,addDays(selectedDate,14))) 
      return "disabled";
    if (isSameDay(day, selectedDate)) return "selected";
    return "available";
  }
  


  renderCells() {
    const { currentMonth, currentDay } = this.state;
    const calendarStart = getMonth(currentMonth)===getMonth(currentDay) ? startOfWeek(currentMonth) :
        startOfMonth(currentMonth);
    const lastDay = getMonth(currentMonth)===getMonth(currentDay) ? addDays(currentDay, 14) : 
        endOfMonth(currentMonth);
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
        const parsed = parseJSON(cloneDay);
        const cellName = this.getCellClass(day, lastDay, calendarStart);
        days.push(
          <div
            className={`col cell ${cellName}`}
            key={day}
            onClick={() => this.onDateClick(parsed, cellName)}
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
    return (
      <div className="box">
        <div className="body">{rows}</div>
      </div>
    );
  }
  nextMonth = () => {
    this.setState({
      currentMonth: addMonths(this.state.currentMonth, 1),
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: subMonths(this.state.currentMonth, 1),
    });
  };

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}

      </div>
      

    );
  }
}

export default Calendar;
