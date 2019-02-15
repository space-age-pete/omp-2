import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../../utils/API";
import MicForm from "../../components/MicForm";

export default class EditMic extends Component {
  state = {
    micName: "",
    locationName: "",
    address: "",
    signUpTime: "",
    startTime: "",
    day: "",
    website: "",
    slotLength: "",
    host: "",
    additionalInfo: "",
    micImage: null,
    loggedIn: false,
    redirectTo: null
  };

  componentDidMount() {
    console.log("CDM props:", this.props);
    //setInterval(() => console.log("CDM props:", this.props), 50);
    //this.setState({ loggedIn: this.props.loggedIn });
    this.loadMic();
  }

  loadMic = () => {
    API.getMic(this.props.match.params.id)
      .then(res => {
        //console.log("res.data: ", res.data);
        let { comments, date, userID, __v, _id, ...rest } = res.data;
        //console.log("rest: ", rest);
        rest.mic = res.data;
        rest.signUpTime = this.timeUnConvert(rest.signUpTime);
        rest.startTime = this.timeUnConvert(rest.startTime);
        this.setState(rest, () => console.log("state", this.state));
        //console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  dayConvert = arg => {
    let week = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    if (typeof arg === Number) return week[arg];
    else if (typeof arg === String) return week.indexOf(arg);
  };

  timeConvert = arg => {
    let firstBit = +arg.substring(0, 2);
    let secondBit = arg.substring(2);
    if (firstBit > 12) return `${firstBit - 12}${secondBit} PM`;
    else if (firstBit === 0) return `12${secondBit} AM`;
    else if (firstBit === 12) return `${arg} PM`;
    else return `${arg} AM`;
  };

  timeUnConvert = arg => {
    let c = arg.indexOf(":");
    let firstBit = +arg.substring(0, c);
    let secondBit = arg.substring(c, c + 3);
    let thirdBit = arg.substring(c + 4);
    //console.log(firstBit, secondBit, thirdBit);
    //if (firstBit === 12 && thirdBit === "PM") return `${firstBit + 12}${secondBit}`;
    if (thirdBit === "PM" && firstBit < 12)
      return `${firstBit + 12}${secondBit}`;
    else if (thirdBit === "AM" && firstBit === 12) return `00${secondBit}`;
    else if (firstBit < 10) return `0${firstBit}${secondBit}`;
    else return `${firstBit}${secondBit}`;
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log("handleForm state: ", this.state);
    //cleaner way to do this with destructuring or w/e?
    if (
      this.state.micName &&
      this.state.locationName &&
      this.state.address &&
      this.state.signUpTime &&
      this.state.startTime &&
      this.state.day &&
      this.props.userID
    ) {
      API.updateMic(this.props.match.params.id, {
        micName: this.state.micName,
        locationName: this.state.locationName,
        address: this.state.address,
        signUpTime: this.timeConvert(this.state.signUpTime),
        startTime: this.timeConvert(this.state.startTime),
        day: this.state.day,
        host: this.state.host,
        slotLength: this.state.slotLength,
        micImage: this.state.micImage,
        lat: null,
        lng: null
      })
        .catch(err => console.log(err))
        .then(res => {
          console.log("res:", res.data.id);
          this.setState({ redirectTo: `/mics/${res.data._id}` });
        });

      //above redirect could be cleaner
    }
  };

  render() {
    // let logged = this.props.loggedIn;
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
      //return <div>somethin went rong</div>;
    } else {
      return (
        <div>
          <MicForm
            micInfo={this.state}
            handleInputChange={this.handleInputChange}
            handleFormSubmit={this.handleFormSubmit}
            testWord="cowboy"
          />
          <button onClick={() => console.log(this.state)}>state</button>
        </div>
      );
    }
  }
}
