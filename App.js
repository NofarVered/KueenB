import React, { Component } from 'react';
import Home from './components/Home';
import HealthStatement from './components/HealthStatement'
import Calendar from "./components/Calendar";
import {BrowserRouter as Router, Route} from "react-router-dom";

class App extends Component {
  state = {
       name: null , 
       email: null, 
       HS_Date: null, 
       REG_Date: null
  };
  //Not sure if the HS_Date field should be a date (the date it was completed) and not Boolean

  addUser = (user) => {
     // update the name and email fields thanks to the form. 
     // not supposed to send anything to DB-yet
    console.log(user.name)
    this.setState({
      name: user.name ,
      email: user.email, 
    });
    // PROBLEM !!! 
    console.log(this.state);
  }
 

  render() {
    return (
        <Router>
          <div className="App">
            <Route exact path='/' render={(props) => (<Home {...props} addUser={this.addUser} />)}/>
            <Route path="/health-statement" component={HealthStatement}/>
            <Route path="/calendar" component={Calendar}/>
        </div>
        </Router>

    );
  }
}

export default App;
