import React, { Component } from "react";
//import { Link } from "react-router-dom";
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
  Container
} from "reactstrap";

export default class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    //cleaner way to do this with destructuring or w/e?
    if (this.state.username && this.state.password) {
      // API.saveUser({
      //   username: this.state.username,
      //   password: this.state.password
      // }).catch(err => console.log(err));
      //   .then(() => this.props.history.push(`/mics`));

      console.log("be more");

      //above redirect could be cleaner
    }
  };

  render() {
    return (
      <Container>
        <Form>
          <FormGroup row>
            <Label for="username" sm={2}>
              Username<span className="asterisk">&nbsp;*</span>
            </Label>
            <Col sm={10}>
              <Input
                value={this.state.username}
                onChange={this.handleInputChange}
                type="text"
                name="username"
                id="username"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="password" sm={2}>
              Password<span className="asterisk">&nbsp;*</span>
            </Label>
            <Col sm={10}>
              <Input
                value={this.state.password}
                onChange={this.handleInputChange}
                type="password"
                name="password"
                id="password"
              />
            </Col>
          </FormGroup>
          <FormGroup check row>
            <Col sm={{ size: 10, offset: 2 }}>
              <Button
                disabled={!(this.state.username && this.state.password)}
                onClick={this.handleFormSubmit}
              >
                Submit
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}
