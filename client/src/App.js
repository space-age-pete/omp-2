import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import AddMic from "./pages/AddMic";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
//import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import "./App.css";

const App = () => (
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

export default App;

//<Route component={NoMatch} />
