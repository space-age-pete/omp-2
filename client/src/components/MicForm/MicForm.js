import React from "react";
import { Redirect } from "react-router-dom";
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

export default class MicForm extends React.Component {
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

  // handleInputChange = event => {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value
  //   });
  //   //console.log("signup time", this.timeConvert(this.state.signUpTime));
  // };

  render() {
    // let logged = this.props.loggedIn;
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
      //return <div>somethin went rong</div>;
    } else {
      return (
        <Container>
          <Jumbotron className="formJumbo">
            {/* {this.props.loggedIn && <div>we logged in</div>} */}
            <Form>
              <FormGroup>
                <Label for="micName">
                  Event Name<span className="asterisk">&nbsp;*</span>
                </Label>

                <Input
                  value={this.props.micInfo.micName}
                  onChange={this.props.handleInputChange}
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
                  value={this.props.micInfo.locationName}
                  onChange={this.props.handleInputChange}
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
                  value={this.props.micInfo.address}
                  onChange={this.props.handleInputChange}
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
                  value={this.props.micInfo.day}
                  onChange={this.props.handleInputChange}
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
                      value={this.props.micInfo.signUpTime}
                      onChange={this.props.handleInputChange}
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
                      value={this.props.micInfo.startTime}
                      onChange={this.props.handleInputChange}
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
                      value={this.props.micInfo.slotLength}
                      onChange={this.props.handleInputChange}
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
                      value={this.props.micInfo.host}
                      onChange={this.props.handleInputChange}
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
                  value={this.props.micInfo.website}
                  onChange={this.props.handleInputChange}
                  type="text"
                  name="website"
                  id="website"
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleText">Additional Info</Label>

                <Input
                  value={this.props.micInfo.additionalInfo}
                  onChange={this.props.handleInputChange}
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
                  {/* onClick = props.handleoform
                or whole button is from props? 
                like at least the name or disabled? */}
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
