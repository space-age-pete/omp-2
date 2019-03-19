import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../utils/API";
import Converters from "../utils/Converters";
import MicForm from "../components/MicForm";

export default class AddMic extends Component {
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
    this.setState({ loggedIn: this.props.loggedIn });
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  fileSelectedHandler = event => {
    console.log("file", event.target.files);
    this.setState({ micImage: event.target.files[0] });
  };

  handleFormSubmit = event => {
    event.preventDefault();
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
      const fd = new FormData();
      fd.append("micName", this.state.micName);
      fd.append("locationName", this.state.locationName);
      fd.append("address", this.state.address);
      fd.append("signUpTime", Converters.timeConvert(this.state.signUpTime));
      fd.append("startTime", Converters.timeConvert(this.state.startTime));
      fd.append("day", this.state.day);
      fd.append("slotLength", this.state.slotLength);
      fd.append("host", this.state.host);
      fd.append("website", this.state.website);
      fd.append("phone", "");
      fd.append("additionalInfo", this.state.additionalInfo);
      fd.append("userID", this.props.userID);
      if (this.state.micImage)
        fd.append("micImage", this.state.micImage, this.state.micImage.name);

      // API.saveMic({
      //   micName: this.state.micName,
      //   locationName: this.state.locationName,
      //   address: this.state.address,
      //   signUpTime: this.state.signUpTime,
      //   startTime: this.state.startTime,
      //   day: this.state.day,
      //   host: this.state.host,
      //   slotLength: this.state.slotLength,
      //   micImage: this.state.micImage
      // })
      API.saveMic(fd)
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
            fileSelectedHandler={this.fileSelectedHandler}
            testWord="cowgirl"
          />
          {/* <button onClick={() => console.log(this.state)}>state</button> */}
        </div>
      );
    }
  }
}
