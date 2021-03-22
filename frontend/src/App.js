import React, { Component } from 'react';
import Home from './components/Home';
import HealthStatement from './components/HealthStatement'
import {BrowserRouter as Router, Route} from "react-router-dom";
import Calendar from "./components/Calendar.jsx";
import "./calendar.css"

class App extends Component {
  //constructor(props) {
    //super(props);
    state = {
      name: '' ,
      email: '',
      HS_Date: '',
      REG_Date: '',
      data: []
    //}
  }

  addHS = (date_copy) => {
    const userdate=date_copy;
    console.log(userdate);
    this.setState({
          HS_Date: userdate},
        () => {console.log(this.state);
        });
    // send to DB
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

  /*handleSubmit(event) {
    event.preventDefault();
    console.log('handle');
    fetch(`http://localhost:3001/registry`)
        .then(response => response.json());
    //.then(state => this.setState(state));
  }*/

  /* takes all data from db to data array */
  handleResults = (event) => {
    event.preventDefault();
    fetch(`http://localhost:3001/registry`)
        .then((result) => this.setState({data: result}));
    // .then(result => console.log(result));
    // .then(state => this.setState(state));
  }

  func = (async e=> {
    const jsonRequest = {}
    jsonRequest.employees = {email: 'e', name: 'n', HS: '0', arrivalDate: '2020-12-1'}
    console.log(jsonRequest);
    let result = await fetch("http://localhost:3001/registry", {method: "POST",
      headers: {"content-type": "application/json"}, body: JSON.stringify(jsonRequest) })
    result = await result.json();
    if (!result.success)  alert("FAILED! ")
  })


  render() {
    const data = this.state.data.map((item) =>
        <li key={item.id}>{item.email} {item.name} {item.hs} {item.arrivaldate}</li>
    )
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