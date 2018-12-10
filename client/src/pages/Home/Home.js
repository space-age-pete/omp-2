import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import API from "../../utils/API";

class Home extends Component {
  state = {
    mics: []
  };

  componentDidMount() {
    this.loadMics();
  }

  componentDidUpdate() {
    console.log("update: ", this.state.mics);
  }

  loadMics = () => {
    API.getMics()
      .then(res => {
        console.log(res.data);
        this.setState({ mics: res.data });
      })
      .catch(err => console.log(err));

    console.log(this.state.mics);
  };

  render() {
    return (
      <div>
        <h1> Welcome to OMP </h1>
        <h3> whatever </h3>
        {this.state.mics.length ? (
          <div>
            {this.state.mics.map(mic => (
              <h5 key={mic._id}>
                <Link to={"/mics/" + mic._id}>{mic.micName}</Link>
              </h5>
            ))}
          </div>
        ) : (
          <h5>nothin' doin'</h5>
        )}
      </div>
    );
  }
}

export default Home;

//<h5>{this.state.mics[0].micName}</h5>
