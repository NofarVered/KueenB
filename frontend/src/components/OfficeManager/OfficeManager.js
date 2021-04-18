import React, {Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./OfficeManager.css"
import Calendar from "../Calendar/Calendar.jsx";
import format from "date-fns/format";
import Button from "react-bootstrap/Button";
import settings_img from "./settings.png";
import {MdClear} from "react-icons/md"

class OfficeManager extends Component {
    state = {
        selectedDate: new Date(),
        registersList: [],
        openSettings: false,
        maxPeople: 0 //maybe we need to save the last value in db and initialize this value accordingly

    }

    sendUpdateMaxPeople = () =>{
        console.log(this.state.maxPeople + "ddd");
        this.props.updateMaxPeople(this.state.maxPeople);
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

    handleChange = (e) => {
        this.setState({
            maxPeople: e.target.value
        });
    }

    onSaveClick = () =>{
        this.sendUpdateMaxPeople();
    }

    openSettings = () =>{
        if (!this.state.openSettings) {
            this.setState({
                openSettings: true,
            });
        }
        else {
            this.setState({
                openSettings: false,
            });
        }
    }

    render(){
        // let temp = {};
        const registersList = this.props.mapRegistersByDay[format(this.state.selectedDate,"dd/MM/yyyy")];
        return(
            <div>
                <div className ="head_box">
                    <button className="settings_btn" onClick={this.openSettings}>
                    <img src={settings_img}  alt=""/>
                    </button>
                    {this.state.openSettings ? <div className="settings_tab">
                        <h2>Settings</h2>
                        <MdClear className="clear_btn" onClick={this.openSettings}/>
                        <p>Number of people allowed in the office</p>
                        <input className="forms" type="text" placeholder=" " onChange={this.handleChange} value={this.state.maxPeople}></input>
                        <div>
                            <Button className="sendButton" variant="primary" size="sm" onClick={this.onSaveClick}>
                                Save
                            </Button>
                        </div>
                    </div> : null}

                </div>
                    <div className ="registers_list">
                    {registersList ? <ol>{(registersList.map((item, index) =><li key={index} className={item.hs ? "black" : "red"}>{item.name}</li>))}</ol>: ''}
                    </div>
                <div className = "calendar_tab">
                    <Calendar onDateClick={this.onDateClick}></Calendar>
                </div>

            </div>
        )
    }

}
export default OfficeManager;