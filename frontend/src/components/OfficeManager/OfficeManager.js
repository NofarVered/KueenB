import React, {Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./OfficeManager.css"
import Calendar from "../Calendar/Calendar.jsx";
import format from "date-fns/format";
import Button from "react-bootstrap/Button";


class OfficeManager extends Component {
    state = {
        selectedDate: new Date(),
        registersList: [],
        maxPeople: 20 //maybe we need to save the last value in db and initialize this value accordingly
    }

    sendUpdateMaxPeople = () =>{
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

    render(){
        let temp = {};
        const registersList = this.props.mapRegistersByDay[format(this.state.selectedDate,"dd/MM/yyyy")];
        return(
            <div>
                <div className ="manager_headpage">
                    <h2>office manager page</h2>
                    <div className ="registers_list">
                    {registersList ? <ol>{(registersList.map((item, index) =><li key={index} className={item.hs ? "black" : "red"}>{item.name}</li>))}</ol>: ''} 

                    </div>
                </div>
                <div className = "calendar_tab">
                    <Calendar onDateClick={this.onDateClick}></Calendar>

                </div>
                <div>
                    <h2>Settings</h2>
                    <p>Number of people allowed in the office</p>
                    <input className="forms" type="text" placeholder=" " onChange={this.handleChange} value={this.state.maxPeople}></input>
                     <div>
                    <Button variant="primary" size="sm" onClick={this.onSaveClick}>
                        Save
                    </Button>
                     </div>
                </div>
                    
            </div>
        )
    }

}
export default OfficeManager;