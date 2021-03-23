import React, { Component } from 'react';
import format from "date-fns/format";

class HealthStatement extends Component {
    state = {
        name: ' ',
        Date: format(new Date(), "dd/MM/yyyy"),
        firstSentence: true,
        secondSentence: true,
        thirdSentence: true,
        forthSentence: true,
    };

    handleInputChange = this.handleInputChange.bind(this);
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    handleOnSubmit = (e) => {
        if (this.state.firstSentence === false || this.state.secondSentence === false || this.state.thirdSentence === false || this.state.forthSentence === false) {
            alert('Please select all');
        }
        else {
            const ans = true;
            // this.props.addHS(ans);
            this.props.addHS(this.state.Date);
        }
    }
    render() {
    return (
        <div>
            <div className="head_box">
                <div className="headpage">Health Statement</div>
                        <div className="dateFill">{this.state.Date}</div>
                </div>
            <div className="contentPage" >
                <h5 className="declare"> I, {this.props.name} declare that: </h5>
                <label className="form-check-label">
                I do not have a cough (other than coughing or difficulty bredthing as a result of a chronic condition, asthma or other allergy).
                <br></br>
                <br></br>
                I do not have a themerature over 38 degrees celsius.
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
                </label>
                <div className="warp1">
                    <input
                        name="firstSentence"
                        type="checkbox"
                        checked={this.state.firstSentence}
                        onChange={this.handleInputChange} 
                        className="cbox"/>
                </div>
                <div className="warp2">
                    <input
                        name="secondSentence"
                        type="checkbox"
                        checked={this.state.secondSentence}
                        onChange={this.handleInputChange}
                        className="cbox"/>
                </div>
                <div className="warp3">
                    <input
                        name="thirdSentence"
                        type="checkbox"
                        checked={this.state.thirdSentence}
                        onChange={this.handleInputChange} 
                        className="cbox"/>
                </div>
                <div className="warp4">
                    <input
                        name="forthSentence"
                        type="checkbox"
                        checked={this.state.forthSentence}
                        onChange={this.handleInputChange}
                        className="cbox"/>
                </div>       
                <button onClick={this.handleOnSubmit} className="sendButton" type='submit'>sent</button> 
            </div>
        </div>
        )
    }
}
export default HealthStatement;