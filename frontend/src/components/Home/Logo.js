import React, {Component } from 'react';
import Klogo from './Klogo.png';

import "./home.css"
class Logo extends Component {
    render(){
        return(
            <div>
                <div className="box">
                    <img className="navlogo" width="90vw" height="90vw" src={Klogo} alt="logo k health"/></div>
                <div className="box">
                    <h2 className="headline"width="270px" height="45px" >Office registration form</h2></div>
            </div>
        )
    }
}
export default Logo;