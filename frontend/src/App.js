import React, { Component } from "react";
import Home from "./components/Home/Home";
import HealthStatement from "./components/HealthStatement/HealthStatement";
import Registers from "./components/Registers/Registers";
import OfficeManager from "./components/OfficeManager/OfficeManager";
import format from "date-fns/format";
import { BrowserRouter as Router, Route } from "react-router-dom";
import UserCalendar from "./components/UserCalendar";
import DaysInOffice from "./components/DaysInOffice/DaysInOffice";
import MessageModal from "./components/MessageModal/MessageModal";
import LoginPage from "./components/LoginPage/LoginPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import SendEmail from "./components/SendEmail/SendEmail";

class App extends Component {
    state = {
      name: '' ,
      email: '',
      HS_Fill: false, //defult obj in the reg time
      REG_Date: '',
      data: [],
      maxPeople: 0,
      mapRegistersByDay: {}, // a dic with a date (key) and all the people that registered to this date (value)
      selectedDate: '', // save the pressed date in the calender
      currentDate: format(new Date(), "dd/MM/yyyy"),   // today date
      showModal: false, //for MessageModal
      modalMessage: ''
  };

  componentDidMount() {
    fetch(`http://localhost:3001/registry`)
      .then((result) => result.json())
      .then((result) =>
        this.setState({ data: result }, () => {
          this.countRegisters();
          this.countDaysPerRegister();
        })
      );
    fetch(`http://localhost:3001/maxPeople`)
    .then(result =>result.json())
    .then((result) => this.setState({maxPeople: result[0].numberofpeople}
    )); 
  }

  addUser = (user_copy) => {
    //add to state email and name
    const username = user_copy.name;
    const useremail = user_copy.email;
    console.log(username);
    this.setState(
      {
        name: username,
        email: useremail,
      },
      () => {
        console.log(this.state);
      }
    );
  };
  setHsByEmail = async (email, currentDate) => {
    //update hs in DB to be TRUE exited email and date (today date)
    //used in addHS function
    const jsonRequest = {};
    jsonRequest.employee = { email: email, arrivalDate: currentDate };
    let result = await fetch("http://localhost:3001/registry", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(jsonRequest),
    });
    result = await result.json();
    if (!result.success) alert("FAILED! ");
  };

  addHS = () => {
    // if the employee signed up for today -> find the row with the email and today date -> update his hs to TRUE in db and HS_Fill in state.
    //else: need to check if there is a place for today->
    // yes -> sign for today (with a message to user) and then change HS_Fill and db to true
    // no -> error message
    if (this.searchByEmailAndDate()) {
      this.setHsByEmail(this.state.email, this.state.currentDate); //update DB
      this.setState(
        {
          // update state
          HS_Fill: true,
        },
        () => {
          console.log(this.state);
        }
      );
    } else {
      console.log(this.state.mapRegistersByDay);
      
            if (this.state.mapRegistersByDay[this.state.currentDate] && 
        this.state.mapRegistersByDay[this.state.currentDate].length>=this.state.maxPeople){
          // defult max people per day- need to be change... 
          //alert("error");
          
          this.setState({
            modalMessage: 'error'
          });
          
            console.log(this.state.modalMessage);
          
      }  
    else {
        this.insertRegistryToDB(
          this.state.email,
          this.state.name,
          true,
          this.state.currentDate
        ); //sign for today

        this.setState(
          {
            // update state
            HS_Fill: true,
            modalMessage: `You haven't registered for today... The system registered you for today and confirmed your HS`
          },
          () => {
            console.log(this.state);
          }
        );
        // alert(
        //   "You never registered for today... Now, the system has registered you for today and confirmed your HS"
        // );
        
      }
    }
  };

  insertRegistryToDB = async (email, name, hs, date) => {
    // for calender and hs
    const jsonRequest = {};
    jsonRequest.employees = {
      email: email,
      name: name,
      HS: hs,
      arrivalDate: date,
    };
    console.log(jsonRequest);
    let result = await fetch("http://localhost:3001/registry", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(jsonRequest),
    });
    result = await result.json();
    if (!result.success) alert("FAILED! ");
  };
  
  searchByEmailAndDate = () => {
    // return true if there is email&currentDate in db
    // else false
    //used in addHS
    let tmpData = this.state.data;
    for (let i = 0; i < tmpData.length; i++) {
      if (tmpData[i].email === this.state.email) {
        if (tmpData[i].arrivaldate === this.state.currentDate) {
          return true;
        }
      }
    }
    return false;
  };

  // update selectedDate to be the pressed date
  setSelectedDate = (selectedDate) => {
    this.setState({ selectedDate });
    // console.log(this.state.selectedDate);
  };

  countRegisters = () => {
    // update mapRegistersByDate dic {DATE: [{NAME, HS}, {NAME, HS} ....], ....}
    let countDic = {};
    let tmpData = this.state.data;
    for (let i = 0; i < tmpData.length; i++) {
      if (countDic[tmpData[i].arrivaldate]) {
        countDic[tmpData[i].arrivaldate].push({
          name: tmpData[i].name,
          hs: tmpData[i].hs,
        });
      } else {
        countDic[tmpData[i].arrivaldate] = [
          { name: tmpData[i].name, hs: tmpData[i].hs },
        ];
      }
    }
    this.setState({ mapRegistersByDay: countDic });
  };

  countDaysPerRegister = () => {
    let countDic = {};
    let tmpData = this.state.data;
    for (let i = 0; i < tmpData.length; i++) {
      if (countDic[tmpData[i].email]) {
        countDic[tmpData[i].email].push(tmpData[i].arrivaldate);
      } else {
        countDic[tmpData[i].email] = [tmpData[i].arrivaldate];
      }
    }
    this.setState({ mapDaysByRegister: countDic },
      () => {
        console.log(this.state);
      }
  );
  };

  // update the field max number of people in the office in the DB
  updateMaxPeople = (async (maxPeople)=> {
    const jsonRequest = {}
    this.setState({maxPeople});
    jsonRequest.maxPeople = maxPeople;
    let result = await fetch("http://localhost:3001/MaxPeople", {method: "PUT", 
                  headers: {"content-type": "application/json"}, body: JSON.stringify(jsonRequest) })
                  result = await result.json();
                  if (!result.success) alert("FAILED! ")
    
  })

  openModalHandler = () => {
      this.setState({
          showModal: true
      });
      console.log("changed");
  }

  closeModalHandler = () => {
      this.setState({
          showModal: false
      });
      console.log("showModal - close changed");
  }

  useMessageModal = () => {
    console.log("hiiii");  
    return(
           <div>
            { this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null }
            <button className="open-modal-btn" onClick={this.openModalHandler}>Open Modal</button>

            <MessageModal
                className="modal"
                show={this.state.showModal}
                message={this.state.MessageModal}
                close={this.closeModalHandler}>
            </MessageModal>
          </div>
          
      );
      
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route
            exact
            path="/"
            render={(props) => <LoginPage {...props} addUser={this.addUser} />}
          />
          <Route
            exact
            path="/sign-up"
            render={(props) => <SignUpPage {...props} />}
          />
          <Route
            exact
            path="/send-email"
            render={(props) => <SendEmail {...props} addUser={this.addUser} />}
          />
          <Route
            exact
            path="/home"
            render={(props) => <Home {...props} addUser={this.addUser} />}
          />
          <Route
            path="/calendar"
            render={(props) => (
              <UserCalendar
                {...props}
                name={this.state.name}
                email={this.state.email}
                mapRegistersByDay={this.state.mapRegistersByDay}
                setSelectedDate={this.setSelectedDate}
                maxPeople = {this.state.maxPeople}
                openModalHandler = {this.openModalHandler}
                closeModalHandler = {this.closeModalHandler}
                useMessageModal = {this.useMessageModal}
                showModal = {this.state.showModal}
              />
            )}
          />
          <Route
            path="/registers"
            render={(props) => (
              <Registers
                {...props}
                mapRegistersByDay={this.state.mapRegistersByDay}
                selectedDate={this.state.selectedDate}
              />
            )}
          />
          <Route
            exact
            path="/office-manager"
            render={(props) => (
              <OfficeManager
                {...props}
                mapRegistersByDay={this.state.mapRegistersByDay}
                setSelectedDate={this.setSelectedDate}
                selectedDate={this.state.selectedDate}
                data={this.state.data}
                updateMaxPeople={this.updateMaxPeople}
                maxPeople = {this.state.maxPeople}
              />
            )}
          />
          <Route
            path="/health-statement"
            render={(props) => (
              <HealthStatement
                {...props}
                name={this.state.name}
                email={this.state.email}
                addHS={this.addHS}
                maxPeople = {this.state.maxPeople}
                openModalHandler = {this.openModalHandler}
                closeModalHandler = {this.closeModalHandler}
                useMessageModal = {this.useMessageModal}
                showModal = {this.state.showModal}
                modalMessage = {this.state.modalMessage}
              />
            )}
          />
          <Route
              path="/days-in-office"
              render={(props) => (
                  <DaysInOffice
                  {...props}
                  email={this.state.email}
                  mapDaysByRegister={this.state.mapDaysByRegister}
                  />
              )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
