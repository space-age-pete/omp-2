import React, { Component } from "react";
import "./Home.css";
import API from "../../utils/API";

class Home extends Component {
  state = {
    mics: [{ micName: "pretend" }]
  };

  componentDidMount() {
    this.loadMics();
  }

  componentDidUpdate() {
    console.log(this.state.mics);
  }

  loadMics = () => {
    API.getMics()
      .then(res => {
        console.log(res.data);
        //this.setState({ mics: res.data })
      })
      .catch(err => console.log(err));

    console.log(this.state.mics);
  };

  render() {
    return (
      <div>
        <h1> Welcome to OMP </h1>
        <h3> whatever </h3>
        {this.state.mics[0].micName}
      </div>
    );
  }
}

export default Home;
