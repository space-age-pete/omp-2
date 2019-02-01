import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../../utils/API";
import MicForm from "../../components/MicForm";
import {
  Col,
  Button,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  Row,
  Container,
  Jumbotron
} from "reactstrap";

export default class EditMic extends Component {
  state = {
    micName: "",
    locationName: "",
    address: "",
    signUpTime: "21:30",
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
    console.log(this.timeUnConvert("9:30 PM"));
    this.timeUnConvert("12:00 AM");
    //setInterval(() => console.log("CDM props:", this.props), 50);
    //this.setState({ loggedIn: this.props.loggedIn });
    this.loadMic();
  }

  loadMic = () => {
    API.getMic(this.props.match.params.id)
      .then(res => {
        console.log("res.data: ", res.data);
        let { comments, date, userID, __v, _id, ...rest } = res.data;
        console.log("rest: ", rest);
        // let { micName, locationName } = {
        //   micName: "test1",
        //   locationName: "test2"
        // };
        rest.mic = res.data;
        this.setState(rest, () => console.log("state", this.state));
        console.log(res.data);
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
    if (thirdBit === "PM") return `${firstBit + 12}${secondBit}`;
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log("signup time", this.timeConvert(this.state.signUpTime));
  };

  handleFormSubmit = event => {
    event.preventDefault();
    //cleaner way to do this with destructuring or w/e?
    // if (
    //   this.state.micName &&
    //   this.state.locationName &&
    //   this.state.address &&
    //   this.state.signUpTime &&
    //   this.state.startTime &&
    //   this.state.day &&
    //   this.props.userID
    // ) {

    //   // API.saveMic({
    //   //   micName: this.state.micName,
    //   //   locationName: this.state.locationName,
    //   //   address: this.state.address,
    //   //   signUpTime: this.state.signUpTime,
    //   //   startTime: this.state.startTime,
    //   //   day: this.state.day,
    //   //   host: this.state.host,
    //   //   slotLength: this.state.slotLength,
    //   //   micImage: this.state.micImage
    //   // })
    //   API.saveMic(fd)
    //     .catch(err => console.log(err))
    //     .then(res => {
    //       console.log("res:", res.data.id);
    //       this.setState({ redirectTo: `/mics/${res.data._id}` });
    //     });

    //above redirect could be cleaner
    //}
  };

  render() {
    // let logged = this.props.loggedIn;
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
      //return <div>somethin went rong</div>;
    } else {
      return (
        <div>
          <MicForm />
        </div>
      );
    }
  }
}
