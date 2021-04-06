import React, { Component } from 'react';
import Home from './components/Home';
import HealthStatement from './components/HealthStatement/HealthStatement'
import Calendar from "./components/Calendar/Calendar.jsx";
import Registers from "./components/Registers/Registers";
import format from "date-fns/format";

import {BrowserRouter as Router, Route} from "react-router-dom";

class App extends Component {
    state = {
      name: '' ,
      email: '',
      HS_Fill: false, //defult obj in the reg time
      REG_Date: '',
      data: [],
      mapRegistersByDay: {},
      currentDate: format(new Date(), "dd/MM/yyyy")  //today date
  }

  componentDidMount() {
    fetch(`http://localhost:3001/registry`)
    .then(result =>result.json())
    .then((result) => this.setState({data: result}, () => {
      this.countRegisters();
    }));
  }
  addUser = (user_copy) => {
    //add to state email and name 
    const username=user_copy.name;
    const useremail=user_copy.email;
    console.log(username)
    this.setState( {
          name: username , email: useremail },
        () => {console.log(this.state);
        } );
  }
  setHsByEmail = (async (email, currentDate)=> {
    //update hs in DB to be TRUE exited email and date (today date)
    //used in addHS function
    const jsonRequest = {}
    jsonRequest.employee = {email: email, arrivalDate: currentDate};
    let result = await fetch("http://localhost:3001/registry", {method: "PUT", 
                  headers: {"content-type": "application/json"}, body: JSON.stringify(jsonRequest) })
                  result = await result.json();
                  if (!result.success)  alert("FAILED! ")
  })

  addHS = () => {
   // if the employee signed up for today -> find the row with the email and today date -> update his hs to TRUE in db and HS_Fill in state.
   //else: need to check if there is a place for today->
      // yes -> sign for today (with a message to user) and then change HS_Fill and db to true
      // no -> error message
    if (this.searchByEmailAndDate()){
        this.setHsByEmail(this.state.email, this.state.currentDate); //update DB
        this.setState({ // update state
            HS_Fill : true },
        () => {console.log(this.state);
        });
        }
    else{
      console.log(this.state.mapRegistersByDay);
      if (this.state.mapRegistersByDay[this.state.currentDate] && 
        this.state.mapRegistersByDay[this.state.currentDate].length>=12){
          // defult max people per day- need to be change... 
          alert("error");
      }  
      else{
        this.insertRegistryToDB(this.state.email, this.state.name, true, this.state.currentDate); //sign for today
        this.setState({ // update state
            HS_Fill : true },
        () => {console.log(this.state);
        });
        alert("You never registered for today... Now, the system has registered you for today and confirmed your HS");
      }
    }
  }
  
insertRegistryToDB = (async (email, name, hs, date)=> {
  // for calender and hs
  const jsonRequest = {}
  jsonRequest.employees = {email: email, name: name, HS: hs , arrivalDate:date }
  console.log(jsonRequest);
  let result = await fetch("http://localhost:3001/registry", {method: "POST", 
                headers: {"content-type": "application/json"}, body: JSON.stringify(jsonRequest) })
                result = await result.json();
                if (!result.success)  alert("FAILED! ")
})
  searchByEmailAndDate = () => {
    // return true if there is email&currentDate in db 
    // else false
    //used in addHS
    let tmpData = this.state.data;
    for (let i=0; i < tmpData.length; i++){
        if (tmpData[i].email === this.state.email){
           if (tmpData[i].arrivaldate === this.state.currentDate){
            return true ;
           } 
        }
    }
    return false;
  };

  countRegisters = () => {
    // update mapRegistersByDate dic {DATE: [NAME, NAME ....], ....}
    let countDic={};
    let tmpData = this.state.data;
    console.log(tmpData);
    for (let i=0; i < tmpData.length; i++){
        if (countDic[tmpData[i].arrivaldate]){
            countDic[tmpData[i].arrivaldate].push(tmpData[i].name); 

        }
        else{
            countDic[tmpData[i].arrivaldate]=[tmpData[i].name];
        }
    }
    this.setState({mapRegistersByDay : countDic})
  };


  render() {
    return (
        <Router>
          <div className="App">
            <Route exact path='/' render={(props) => (<Home {...props} addUser={this.addUser} />)}/>
            <Route path="/health-statement" render={(props) => (<HealthStatement {...props} name={this.state.name} email={this.state.email} addHS={this.addHS}/>)} />
            <Route path="/calendar" render={(props) => (<Calendar {...props} name={this.state.name} email={this.state.email} mapRegistersByDay={this.state.mapRegistersByDay} insertRegistryToDB={this.insertRegistryToDB}/>)} />
            <Route path="/registers" render={(props) => (<Registers {...props} mapRegistersByDay={this.state.mapRegistersByDay}/>)} />
          </div>
        </Router>

    );
  }
}

export default App;