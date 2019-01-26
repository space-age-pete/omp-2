import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../../utils/API";
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
    slotLength: 0,
    host: "",
    micImage: null,
    loggedIn: false
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
    console.log(this.props.loggedIn);
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
      fd.append("signUpTime", this.state.signUpTime);
      fd.append("startTime", this.state.startTime);
      fd.append("day", this.state.day);
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
        .then(() => this.props.history.push(`/mics`));

      //above redirect could be cleaner
    }
  };

  render() {
    // let logged = this.props.loggedIn;
    // if (this.state.redirectTo) {
    //   //return <Redirect to={{ pathname: this.state.redirectTo }} />;
    //   return <div>somethin went rong</div>;
    // } else {
    return (
      <Container>
        {/* <Jumbotron className="formJumbo">
          {this.props.loggedIn && <div>we logged in</div>}
          <Form>
            <FormGroup row>
              <Label for="micName" sm={2}>
                Event Name*
              </Label>
              <Col sm={10}>
                <Input
                  value={this.state.micName}
                  onChange={this.handleInputChange}
                  type="text"
                  name="micName"
                  id="micName"
                  placeholder="with a placeholder"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="locationName" sm={2}>
                Location Name*
              </Label>
              <Col sm={10}>
                <Input
                  value={this.state.locationName}
                  onChange={this.handleInputChange}
                  type="text"
                  name="locationName"
                  id="locationName"
                  placeholder="with a placeholder"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="address" sm={2}>
                Address*
              </Label>
              <Col sm={10}>
                <Input
                  value={this.state.address}
                  onChange={this.handleInputChange}
                  type="text"
                  name="address"
                  id="address"
                  placeholder="with a placeholder"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="day" sm={2}>
                Day of Week*
              </Label>
              <Col sm={10}>
                <Input
                  value={this.state.day}
                  onChange={this.handleInputChange}
                  type="select"
                  name="day"
                  id="day"
                >
                  <option />
                  <option>Sunday</option>
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thursday</option>
                  <option>Friday</option>
                  <option>Saturday</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="signUpTime" sm={2}>
                Sign Up Time*
              </Label>
              <Col sm={10}>
                <Input
                  value={this.state.signUpTime}
                  onChange={this.handleInputChange}
                  type="text"
                  name="signUpTime"
                  id="signUpTime"
                  placeholder="with a placeholder"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="startTime" sm={2}>
                Start Time*
              </Label>
              <Col sm={10}>
                <Input
                  value={this.state.startTime}
                  onChange={this.handleInputChange}
                  type="text"
                  name="startTime"
                  id="startTime"
                  placeholder="with a placeholder"
                />
              </Col>
            </FormGroup>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="slotLength">Slot Length</Label>
                  <Input
                    value={this.state.slotLength}
                    onChange={this.handleInputChange}
                    type="number"
                    name="slotLength"
                    id="slotLength"
                    placeholder="with a placeholder"
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
                    placeholder="host placeholder"
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup row>
              <Label for="exampleText" sm={2}>
                Text Area
              </Label>
              <Col sm={10}>
                <Input type="textarea" name="text" id="exampleText" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="micImage" sm={2}>
                File
              </Label>
              <Col sm={10}>
                <Input
                  onChange={this.fileSelectedHandler}
                  type="file"
                  name="micImage"
                  id="micImage"
                />
                <FormText color="muted">
                  This is some placeholder block-level help text for the above
                  input. It's a bit lighter and easily wraps to a new line.
                </FormText>
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Col sm={{ size: 10, offset: 2 }}>
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
            <Button onClick={() => console.log(this.state, this.props)} />
          </Form>
        </Jumbotron> */}
        <Jumbotron className="formJumbo">
          {this.props.loggedIn && <div>we logged in</div>}
          <Form>
            <FormGroup row>
              <Label for="micName">Event Name*</Label>

              <Input
                value={this.state.micName}
                onChange={this.handleInputChange}
                type="text"
                name="micName"
                id="micName"
                placeholder="with a placeholder"
              />
            </FormGroup>
            <FormGroup row>
              <Label for="locationName">Location Name*</Label>

              <Input
                value={this.state.locationName}
                onChange={this.handleInputChange}
                type="text"
                name="locationName"
                id="locationName"
                placeholder="with a placeholder"
              />
            </FormGroup>
            <FormGroup row>
              <Label for="address">Address*</Label>

              <Input
                value={this.state.address}
                onChange={this.handleInputChange}
                type="text"
                name="address"
                id="address"
                placeholder="with a placeholder"
              />
            </FormGroup>
            <FormGroup row>
              <Label for="day">Day of Week*</Label>

              <Input
                value={this.state.day}
                onChange={this.handleInputChange}
                type="select"
                name="day"
                id="day"
              >
                <option />
                <option>Sunday</option>
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
                <option>Saturday</option>
              </Input>
            </FormGroup>
            <FormGroup row>
              <Label for="signUpTime">Sign Up Time*</Label>

              <Input
                value={this.state.signUpTime}
                onChange={this.handleInputChange}
                type="text"
                name="signUpTime"
                id="signUpTime"
                placeholder="with a placeholder"
              />
            </FormGroup>
            <FormGroup row>
              <Label for="startTime">Start Time*</Label>

              <Input
                value={this.state.startTime}
                onChange={this.handleInputChange}
                type="text"
                name="startTime"
                id="startTime"
                placeholder="with a placeholder"
              />
            </FormGroup>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="slotLength">Slot Length</Label>
                  <Input
                    value={this.state.slotLength}
                    onChange={this.handleInputChange}
                    type="number"
                    name="slotLength"
                    id="slotLength"
                    placeholder="with a placeholder"
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
                    placeholder="host placeholder"
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup row>
              <Label for="exampleText">Text Area</Label>

              <Input type="textarea" name="text" id="exampleText" />
            </FormGroup>
            <FormGroup row>
              <Label for="micImage">Image</Label>

              <Input
                onChange={this.fileSelectedHandler}
                type="file"
                name="micImage"
                id="micImage"
              />
              <FormText color="muted">
                This is some placeholder block-level help text for the above
                input. It's a bit lighter and easily wraps to a new line.
              </FormText>
            </FormGroup>
            <FormGroup check row>
              <Col sm={{ size: 10, offset: 2 }}>
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
            <Button onClick={() => console.log(this.state, this.props)} />
          </Form>
        </Jumbotron>
      </Container>
    );
    //}
  }
}
