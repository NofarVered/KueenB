import React, {Component } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Klogo from "../Klogo.png";
import {Link} from "react-router-dom";
import "./OfficeManager.css"
import Calendar from "./Calendar/Calendar.jsx";
import Registers from "./Registers/Registers.js";
import format from "date-fns/format";
import { json } from 'body-parser';


class OfficeManager extends Component {
    state = {
        selectedDate: new Date(),
        registersList: []
    }

    onDateClick = day => {
        this.setState({
            selectedDate: day,
            registersList: this.props.mapRegistersByDay[format(day, 
                "dd/MM/yyyy")]
        });
    };
    


    componentDidMount(){

        };

    render(){
        let temp = {};
        console.log(typeof(temp));
        const list = [{"id":40,"email":"asd@g.com","name":"akflk","hs":false,"arrivaldate":"11/04/2021"},{"id":37,"email":"asd@g.com","name":"skdsa","hs":false,"arrivaldate":"11/04/2021"}]
        const registersList = this.props.mapRegistersByDay[format(this.state.selectedDate,"dd/MM/yyyy")];
        console.log(registersList);

        return(
            <div>
                <div className ="manager_headpage">
                    <h2>office manager page</h2>
                    <div className ="registers_list">
                    {registersList ? <ol>{(registersList.map((item, index) =><li key={index} className={item.hs ? "black" : "red"}>{item.name}</li>))}</ol>: 'hi'} 

                    </div>
                </div>
                <div className = "calendar_tab">
                    <Calendar onDateClick={this.onDateClick}></Calendar>

                </div>
                
                    
            </div>
        )
    }

}
export default OfficeManager;