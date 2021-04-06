import React from 'react';
import format from "date-fns/format";
import "./Registers.css"
import {HiArrowLeft} from "react-icons/hi";
import {Link} from "react-router-dom";


class Registers extends React.Component {

    render(){
        const date = format(this.props.selectedDate,"dd/MM/yyyy");
        let registersList = this.props.mapRegistersByDay[format(this.props.selectedDate,"dd/MM/yyyy")];
        if (registersList) {registersList = registersList.map((item, index) =><li key={index}>{item.name}</li>)}
              return (
                <div>
                    <div className="head_box">
                    <Link to="/calendar">
                            <div className="arrow" onClick={this.handleSubmit}>
                            <HiArrowLeft />
                            </div>
                            </Link>   
                        <div className="headpage">Registers List</div>
                        <div className="dateFill">{date}</div>
                        </div>
                    <div className="contentPage" >
                    <ol>{registersList}</ol>
                    </div>
                </div>

        )
    }
}

export default Registers;
