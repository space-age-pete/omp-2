import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home.js";
import Detail from "./pages/Detail.js";
import AddMic from "./pages/AddMic.js";
import EditMic from "./pages/EditMic.js";
import SignUp from "./pages/SignUp.js";
import Login from "./pages/Login.js";
import MapSolo from "./components/MapSolo";
//import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav.js";
import API from "../src/utils/API";
import "./App.css";

class App extends Component {
  state = {
    loggedIn: false,
    username: null,
    userID: null
  };

  componentDidMount() {
    this.getUser();
  }

  updateUser = userObject => {
    this.setState(userObject);
  };

  logOutUser = () => {
    API.logOutUser()
      .then(response => {
        console.log(response.data);
        if (response.status === 200) {
          this.setState({
            loggedIn: false,
            username: null,
            userID: null
          });
        }
      })
      .catch(error => {
        console.log("Logout error: ", error);
      });
  };

  getUser = () => {
    API.getUser().then(response => {
      console.log("Get user response: ");
      console.log(response.data);
      if (response.data.user) {
        console.log("Get User: There is a user saved in the server session: ");

        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          userID: response.data.user._id
        });
      } else {
        console.log("Get user: no user");
        this.setState({
          loggedIn: false,
          username: null,
          userID: null
        });
      }
    });
  };

  render() {
    return (
      <Router>
        <div>
          <Nav loggedIn={this.state.loggedIn} logout={this.logOutUser} />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Home
                  loggedIn={this.state.loggedIn}
                  userID={this.state.userID}
                />
              )}
            />
            <Route
              exact
              path="/mics"
              render={() => (
                <Home
                  loggedIn={this.state.loggedIn}
                  userID={this.state.userID}
                />
              )}
            />
            {/* <Route exact path="/mihcs/:id" component={Detail} /> */}
            <Route
              exact
              path="/mics/:id"
              render={props => (
                <Detail
                  {...props}
                  loggedIn={this.state.loggedIn}
                  userID={this.state.userID}
                />
              )}
            />
            <Route
              exact
              path="/editmic/:id"
              render={props => (
                <EditMic
                  {...props}
                  loggedIn={this.state.loggedIn}
                  userID={this.state.userID}
                />
              )}
            />
            <Route
              exact
              path="/newmic"
              render={() => (
                <AddMic
                  loggedIn={this.state.loggedIn}
                  userID={this.state.userID}
                />
              )}
            />
            {/* <Route exact path="/signup" component={SignUp} /> */}
            <Route exact path="/maptest" component={MapSolo} />
            <Route
              exact
              path="/signup"
              render={() => <SignUp updateUser={this.updateUser} />}
            />
            <Route
              exact
              path="/login"
              render={() => <Login updateUser={this.updateUser} />}
            />
          </Switch>
          {/* <button onClick={() => console.log(this.state)}>
            click for state
          </button> */}
        </div>
      </Router>
    );
  }
}

export default App;

//<Route component={NoMatch} />
