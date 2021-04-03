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
                        onClick={() => this.props.onDateClick(parsed)}
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