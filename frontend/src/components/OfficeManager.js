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
    state = {
        registersList: [],
        selectedDate: new Date()
  
    }

    onDateClick = day => {
       this.setState({
            selectedDate: day,
        });
        console.log(this.state.selectedDate)
    };
    
    renderNames = () => {
        const registersList = this.props.mapRegistersByDay[format(this.state.selectedDate,"dd/MM/yyyy")];
        console.log(registersList);
        let list=<li></li>;
        if(registersList) {list = registersList.map((item) =><li className={item.hs ? "black" : "red"}>{item.name}</li>)}
        return list;
    }

    componentDidMount(){

        };

    render(){
        const registersList = this.props.mapRegistersByDay[format(this.state.selectedDate,"dd/MM/yyyy")];
        
        return(
            <div>
                <div className ="manager_headpage">
                    <h2>office manager page</h2>
                    <div className ="registers_list">
                    {registersList ? (<ol> {registersList.map((item, index) => {return <li key={index} className={item.hs ? "black" : "red"}>{item.name}</li>})}
                </ol>): (<ol>{'hi'}</ol>)}
                </div>
                {console.log(registersList)}
                </div>
                <div className = "calendar_tab">
                    <Calendar onDateClick={this.onDateClick}></Calendar>

                </div>
                
                    
            </div>
        )
    }

}
export default OfficeManager;