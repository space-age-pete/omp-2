import React from "react";
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
import MicFormInput from "./MicFormInput";

export default class MicForm extends React.Component {
  state = {};

  render() {
    return (
      <Container>
        <Jumbotron className="formJumbo">
          {/* {this.props.loggedIn && <div>we logged in</div>} */}
          <Form>
            <MicFormInput field="micName" label="Event Name" {...this.props} />
            <MicFormInput
              field="locationName"
              label="Location Name"
              {...this.props}
            />
            <MicFormInput field="address" label="Address" {...this.props} />
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
                <MicFormInput field="host" label="Host" {...this.props} />
              </Col>
            </Row>
            <MicFormInput field="website" label="Website" {...this.props} />
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
                onChange={this.props.fileSelectedHandler}
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
                      this.props.micInfo.micName &&
                      this.props.micInfo.locationName &&
                      this.props.micInfo.address &&
                      this.props.micInfo.signUpTime &&
                      this.props.micInfo.startTime &&
                      this.props.micInfo.day
                    )
                    // &&
                    // this.props.loggedIn
                  }
                  onClick={this.props.handleFormSubmit}
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
