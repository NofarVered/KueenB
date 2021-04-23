import React, { Component } from "react";
import format from "date-fns/format";
import { HiArrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import "./HS.css";
import MessageModal from "../MessageModal/MessageModal.js";

class HealthStatement extends Component {
  state = {
    name: this.props.name,
    email: this.props.email,
    Today_Date: new Date(),
  };

    handleOnSubmit = (e) => {
        this.props.addHS();
        this.props.openModalHandler();
    }
    render() {
        return (
            <div>
                <div className="head_box">
                    <div className="headpage">Health Statement</div>
                    <div className="dateFill">{format(this.state.Today_Date, "dd/MM/yyyy")}</div>
                </div>
                <div>
                    <Link to="/">
                        <div className="arrow" onClick={this.handleSubmit}>
                            <HiArrowLeft />
                          
                        </div>
                    </Link>
                    
                    <h5 className="declare"> I, {this.state.name} declare that: </h5>
                </div>
                <div className="form-check-label">
                    I do not have a cough (other than coughing or difficulty bredthing as a result of a chronic condition, asthma or other allergy).
                <br></br>
                    <br></br>
                I do not have a temperature over 38 degrees celsius.
                <br></br>
                    <br></br>
                I have not had a fever (over 38 degrees celsius) over the last week.
                <br></br>
                    <br></br>
                I have not been in contact with anyone diagnosed with coronavirus over the last 2 weeks.
                <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                </div>
                    <button onClick={this.handleOnSubmit} className="sendButton" type='submit'>send</button>
                    {this.props.showModal ? 
                    <div>
                        <MessageModal
                            className="modal"
                            show={this.props.showModal}
                            message = {this.props.modalMessage}
                            close={this.props.closeModalHandler}>
                        </MessageModal>
                </div> : null}
      </div>
    );
  }
}
export default HealthStatement;
