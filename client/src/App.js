import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import AddMic from "./pages/AddMic";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
//import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import API from "../src/utils/API";
import "./App.css";

class App extends Component {
  state = {
    loggedIn: false,
    username: null
  };

  componentDidMount() {
    this.getUser();
  }

  updateUser = userObject => {
    this.setState(userObject);
  };

  getUser = () => {
    API.getUser().then(response => {
      console.log("Get user response: ");
      console.log(response.data);
      if (response.data.user) {
        console.log("Get User: There is a user saved in the server session: ");

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        });
      } else {
        console.log("Get user: no user");
        this.setState({
          loggedIn: false,
          username: null
        });
      }
    });
  };

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/mics" component={Home} />
            <Route exact path="/mics/:id" component={Detail} />
            <Route exact path="/newmic" component={AddMic} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

//<Route component={NoMatch} />
