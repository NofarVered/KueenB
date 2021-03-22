import React, {Component } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import regLogo from '../register.png';
import healthLogo from '../health-statement.png'
import Klogo from "../Klogo.png";
import {Link} from "react-router-dom";


class Home extends Component {
    state = {
        name: '',
        email: ''
    }
    handleChange_name= (e) => {
        this.setState({
            name: e.target.value
        });
    }
    handleChange_email= (e) => {
        this.setState({
            email: e.target.value
        });
    }
    handleSubmit = (e) => {
        // e.preventDefault();
        console.log(this.state);
        this.props.addUser(this.state);
        // this.setState({
        //     name: '',
        //     email: '',
        //     HS_Date: '',
        //     REG_Date: ''
        // });
    }

    render(){
        return(
            <div>
                <Link
                    to={{
                        pathname: "/calendar",
                        state: this.state
                    }}
                />
                <div className="box">
                    <img className="navlogo" width="90vw" height="90vw" src={Klogo} alt="logo k health"/></div>
                <div className="box">
                    <h2 className="headline"width="270px" height="45px" >Office registration form</h2></div>
                <form>
                    <div className="box">
                            <input className="forms" type="text" placeholder="Your name" onChange={this.handleChange_name} value={this.state.name} />
                    </div>
                    <div className="box">
                            <input className="forms" type="text" placeholder="Email" onChange={this.handleChange_email} value={this.state.email} />
                    </div>
                    <div className="box">
                    <Link to="/calendar"><Button onClick={this.handleSubmit} variant="light" className="nav-buttons"><img src={regLogo} width="45px" height="45px" alt=""/><br/>Register to a day in the office</Button></Link>
                    <Link to="/health-statement"><Button onClick={this.handleSubmit} variant="light" className="nav-buttons"><img src={healthLogo} width="45px" height="45px" alt=""/><br/>Fill a health statement</Button></Link>
                    </div>
                </form>
                </div>
        )
    }

}
export default Home;