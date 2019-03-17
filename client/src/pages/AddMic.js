import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../utils/API";
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
    console.log("signup time", this.timeConvert(this.state.signUpTime));
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
      fd.append("signUpTime", this.timeConvert(this.state.signUpTime));
      fd.append("startTime", this.timeConvert(this.state.startTime));
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
        <Container>
          <Jumbotron id="addMicJumbo">
            {/* {this.props.loggedIn && <div>we logged in</div>} */}
            <h3 id="addMicTitle">Add an Open Mic Night Event</h3>
            <Form>
              <FormGroup>
                <Label for="micName">
                  Event Name<span className="asterisk">&nbsp;*</span>
                </Label>

                <Input
                  value={this.state.micName}
                  onChange={this.handleInputChange}
                  type="text"
                  name="micName"
                  id="micName"
                />
              </FormGroup>
              <FormGroup>
                <Label for="locationName">
                  Location Name<span className="asterisk">&nbsp;*</span>
                </Label>

                <Input
                  value={this.state.locationName}
                  onChange={this.handleInputChange}
                  type="text"
                  name="locationName"
                  id="locationName"
                />
              </FormGroup>
              <FormGroup>
                <Label for="address">
                  Address<span className="asterisk">&nbsp;*</span>
                </Label>

                <Input
                  value={this.state.address}
                  onChange={this.handleInputChange}
                  type="text"
                  name="address"
                  id="address"
                />
              </FormGroup>
              <FormGroup>
                <Label for="day">
                  Day of Week<span className="asterisk">&nbsp;*</span>
                </Label>

                <Input
                  value={this.state.day}
                  onChange={this.handleInputChange}
                  type="select"
                  name="day"
                  id="day"
                >
                  <option />
                  {/* <option disabled>Select</option> */}
                  <option>Sunday</option>
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thursday</option>
                  <option>Friday</option>
                  <option>Saturday</option>
                </Input>
              </FormGroup>

              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="signUpTime">
                      Sign Up Time<span className="asterisk">&nbsp;*</span>
                    </Label>

                    <Input
                      value={this.state.signUpTime}
                      onChange={this.handleInputChange}
                      type="time"
                      name="signUpTime"
                      id="signUpTime"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="startTime">
                      Start Time<span className="asterisk">&nbsp;*</span>
                    </Label>

                    <Input
                      value={this.state.startTime}
                      onChange={this.handleInputChange}
                      type="time"
                      name="startTime"
                      id="startTime"
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="slotLength">Slot Length (minutes)</Label>
                    <Input
                      value={this.state.slotLength}
                      onChange={this.handleInputChange}
                      type="number"
                      name="slotLength"
                      id="slotLength"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="host">Host</Label>
                    <Input
                      value={this.state.host}
                      onChange={this.handleInputChange}
                      type="text"
                      name="host"
                      id="host"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="website">Website</Label>

                <Input
                  value={this.state.website}
                  onChange={this.handleInputChange}
                  type="text"
                  name="website"
                  id="website"
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleText">Additional Info</Label>

                <Input
                  value={this.state.additionalInfo}
                  onChange={this.handleInputChange}
                  type="textarea"
                  name="additionalInfo"
                  id="additionalInfo"
                />
              </FormGroup>
              <FormGroup>
                <Label for="micImage">Image</Label>

                <Input
                  onChange={this.fileSelectedHandler}
                  type="file"
                  name="micImage"
                  id="micImage"
                />
                <FormText color="muted">
                  Works best if the image is a square.
                </FormText>
              </FormGroup>
              <FormGroup check>
                <Col>
                  <Button
                    disabled={
                      !(
                        this.state.micName &&
                        this.state.locationName &&
                        this.state.address &&
                        this.state.signUpTime &&
                        this.state.startTime &&
                        this.state.day &&
                        this.props.loggedIn
                      )
                    }
                    onClick={this.handleFormSubmit}
                  >
                    Submit
                  </Button>
                </Col>
              </FormGroup>
              {/* <Button onClick={() => console.log(this.state, this.props)} /> */}
            </Form>
          </Jumbotron>
        </Container>
      );
    }
  }
}
