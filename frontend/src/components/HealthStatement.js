import React, { Component } from 'react';
class HealthStatement extends Component {
    state = {
        name: ' ',
        Date: new Date().getDate()+ "/"+ (new Date().getMonth()+1) + "/"+ new Date().getFullYear(),
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
        // const isChecked = this.setState(c => c.checked === true)
        // if(isChecked) {
        //      this.setState({ count: this.state.count + 1 })
        //  }
    }
    handleOnSubmit = (e) => {
        if(this.state.firstSentence === false || this.state.secondSentence === false || this.state.thirdSentence === false || this.state.forthSentence === false  )
        {
            alert('Please select all');
        }
        else
            this.props.addHS(this.state.Date);
    }

    render() {
        return (
            <div style={{"color": "#00406B"}} className="HS_headpage">
                <center>
                    <h5><b>Health Statement</b></h5>
                    <h6> {this.state.Date}</h6>
                    <h5><b>I, {this.props.name}, declare that:</b></h5>
                    <div style = {{textAlign: 'left'}} >
                        <input
                            name="firstSentence"
                            type="checkbox"
                            checked={this.state.firstSentence}
                            onChange={this.handleInputChange}
                            style={{
                                width: 14.5,
                                height: 14.5
                            }}
                        />
                        <h5>
                            I do not have a cough (other than
                            <br></br>
                            coughing or difficulty bredthing as a
                            <br></br>
                            result of a chronic condition, asthma or
                            <br></br>
                            other allergy)
                        </h5>

                        <input
                            name="secondSentence"
                            type="checkbox"
                            checked={this.state.secondSentence}
                            onChange={this.handleInputChange}
                            style={{
                                width: 14.5,
                                height: 14.5
                            }}/>
                        <h5>
                            I do not have a themerature over 38
                            <br></br>
                            degrees celsius
                        </h5>

                        <input
                            name="thirdSentence"
                            type="checkbox"
                            checked={this.state.thirdSentence}
                            onChange={this.handleInputChange}
                            style={{
                                width: 14.5,
                                height: 14.5
                            }}/>
                        <h5>
                            I have not had a fever (over 38 degrees
                            <br></br>
                            celsius) over the last week
                        </h5>

                        <input
                            name="forthSentence"
                            type="checkbox"
                            checked={this.state.forthSentence}
                            onChange={this.handleInputChange}
                            style={{
                                width: 14.5,
                                height: 14.5,
                            }}/>
                        <h5>
                            I have not been in contact with anyone
                            <br></br>
                            diagnosed with coronavirus over the
                            <br></br>
                            last 2 weeks
                        </h5>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>

                    <button onClick={this.handleOnSubmit}
                            type = 'submit'
                            style = {{
                                width: 155,
                                height: 40,
                                "background": "#2B8FFF",
                                "color": "#FFFFFF",
                            }}>sent</button>

                </center>
            </div>


        )
    }
}
export default HealthStatement;