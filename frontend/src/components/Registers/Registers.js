import React, {Component } from 'react';
import format from "date-fns/format";
import Calendar from "../Calendar/Calendar";
import "./Registers.css"


class Registers extends React.Component {

    render(){
        const registersList = this.props.mapRegistersByDay[format(this.props.selectedDate,"dd/MM/yyyy")];
        const data = registersList.map((item) =>
        <li>{item}</li>
              )
              return (
                <div>
                    <div className="head_box">
                        {/* <div className="headpage">Health Statement</div>
                                <div className="dateFill">{this.props.selectedDate}</div> */}
                        </div>
                    <div className="contentPage" >
                    <ol>{data}</ol>
                    </div>
                </div>

        )
    }
}

export default Registers;
