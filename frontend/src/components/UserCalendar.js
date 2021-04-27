import React from "react";
import format from "date-fns/format";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import {HiArrowLeft} from "react-icons/hi";
import {Link} from "react-router-dom";

import "./Calendar/calendar.css";
import Calendar from "./Calendar/Calendar";
import MessageModal from "./MessageModal/MessageModal";

class UserCalendar extends React.Component {
    state = {
        currentMonth: new Date(),
        selectedDate: new Date(),
        currentDay: new Date(),
        registersList: [],
        maxPeople: this.props.maxPeople,
        modalMessage: ''
        // showModal: this.props.showModal
    };
    


    onDateClick = (day,className) => {
        if (className==="past") return;
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
        const list_reg = this.props.mapRegistersByDay[format(this.state.selectedDate,"dd/MM/yyyy")] ;
        if (list_reg && list_reg.length > this.props.maxPeople){
            this.setState({
                modalMessage: "Day is full"
            })
            console.log("Day is full");
            this.props.openModalHandler();
        }
        else{
            this.insertRegistryToDB(this.props.email, this.props.name, false, format(this.state.selectedDate, "dd/MM/yyyy"));
            // alert("You have successfully signed for "+format(this.state.selectedDate, "dd/MM/yyyy"));
            console.log(this.props.email, this.props.name, false, format(this.state.selectedDate, "dd/MM/yyyy"));
            this.setState({
                modalMessage: `You have successfully signed for  ${format(this.state.selectedDate, "dd/MM/yyyy")}`
            })
            this.props.openModalHandler();
            
        }
    }

    handleSubmit = (e) => {
        console.log(this.state);
        this.props.setSelectedDate(this.state.selectedDate);
    }



    render() {
        console.log("showModal ==== ", this.props.showModal);
        const dicValue = this.props.mapRegistersByDay[format(this.state.selectedDate, 
            "dd/MM/yyyy")];
        // const maxPeople = 20;
        const numOfRegistersString = dicValue ? ` ${dicValue.length} registered (${this.state.maxPeople-(dicValue.length)} available)` : 
        `0 registered (${this.state.maxPeople} available)`;
        const {showModal, modalMessage, closeModalHandler} = this.props
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
                                {numOfRegistersString}
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
                    {showModal ?
                        <MessageModal
                            className="modal"
                            show={showModal}
                            message = {this.state.modalMessage}
                            close={closeModalHandler}>
                        </MessageModal>
                 : null}
                
            </div>
        );
    }
}

export default UserCalendar;
