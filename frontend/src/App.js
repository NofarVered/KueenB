import React, { Component } from 'react';
import Home from './components/Home';
import HealthStatement from './components/HealthStatement'
import Calendar from "./components/Calendar/Calendar.jsx";
import {BrowserRouter as Router, Route} from "react-router-dom";

class App extends Component {
    state = {
      name: '' ,
      email: '',
      HS_Date: '',
      REG_Date: '',
      data: []
  }

  setHsByEmail = (async (email, currentDate)=> {
    const jsonRequest = {}
    jsonRequest.employee = {email: email, arrivalDate: currentDate};
    console.log(jsonRequest);
    let result = await fetch("http://localhost:3001/registry", {method: "PUT", 
                  headers: {"content-type": "application/json"}, body: JSON.stringify(jsonRequest) })
                  result = await result.json();
                  if (!result.success)  alert("FAILED! ")
  })

  getCurrentDB = () => { //remove later
    fetch(`http://localhost:3001/registry`)
      .then(result =>result.json())
    //   .then((result) => this.setState({data: result}));
    .then(res => console.log(res));
  }

  addHS = (date_copy) => {
    const userdate = date_copy;
    console.log(userdate);
    this.setState({
          HS_Date: userdate},
        () => {console.log(this.state);
        });
    
    this.setHsByEmail(this.state.email, userdate);
    console.log(typeof(userdate));
    this.getCurrentDB();
  }


  addUser = (user_copy) => {
    const username=user_copy.name;
    const useremail=user_copy.email;
    console.log(username)
    this.setState( {
          name: username , email: useremail },
        () => {console.log(this.state);
        } );
  }

  render() {
    return (
        <Router>
          <div className="App">
            <Route exact path='/' render={(props) => (<Home {...props} addUser={this.addUser} />)}/>
            <Route path="/health-statement" render={(props) => (<HealthStatement {...props} name={this.state.name} addHS={this.addHS}/>)} />
            <Route path="/calendar" render={(props) => (<Calendar {...props} name={this.state.name} email={this.state.email} data={this.state.data}/>)} />
          </div>
        </Router>

    );
  }
}

export default App;