import React, {Component } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Klogo from "../Klogo.png";
import {Link} from "react-router-dom";
import "./OfficeManager.css"
import Calendar from "./Calendar/Calendar.jsx";
import Registers from "./Registers/Registers.js";
import format from "date-fns/format";

class OfficeManager extends Component {
       

    render(){
        
        const Data = this.props.mapRegistersByDay;
        console.log(Data);
        return(
            <div>
    
                <div className = "headpage">
                    <h2>office manager page</h2>
                    <Registers mapRegistersByDay={this.props.mapRegistersByDay} selectedDate={this.props.selectedDate} ></Registers>
                
                </div>
                <div className = "calendar_tab">
                    <h2>calendar</h2>
                    <Calendar mapRegistersByDay={this.props.mapRegistersByDay} setSelectedDate={this.props.setSelectedDate}></Calendar>

                </div>
                
                    
            </div>
        )
    }

}
export default OfficeManager;