import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
//import Detail from "./pages/Detail";
//import NoMatch from "./pages/NoMatch";
import './App.css';

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/books" component={Home} />
        {/*
        <Route exact path="/books/:id" component={Detail} />
        <Route component={NoMatch} />
        */}
      </Switch>
    </div>
  </Router>
);

export default App;
