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
import "./SignUp.css";

export default class SignUp extends Component {
  state = {
    username: "",
    password: "",
    confirmPassword: ""
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
    if (
      this.state.username &&
      this.state.password &&
      this.state.confirmPassword
    ) {
      API.saveUser({
        username: this.state.username,
        password: this.state.password
      })
        .then(
          API.LoginUser({
            username: this.state.username,
            password: this.state.password
          })
        )
        //.then(() => this.props.history.push(`/mics`))
        .catch(err => console.log(err));
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
          <FormGroup row>
            <Label for="confirmPassword" sm={2}>
              Confirm Password<span className="asterisk">&nbsp;*</span>
            </Label>
            <Col sm={10}>
              <Input
                value={this.state.confirmPassword}
                onChange={this.handleInputChange}
                type="password"
                name="confirmPassword"
                id="confirmPassword"
              />
            </Col>
          </FormGroup>
          <FormGroup check row>
            <Col sm={{ size: 10, offset: 2 }}>
              <Button
                disabled={
                  !(
                    this.state.username &&
                    this.state.password &&
                    this.state.confirmPassword
                  )
                }
                onClick={this.handleFormSubmit}
              >
                Submit
              </Button>
            </Col>
          </FormGroup>
          <Button onClick={() => console.log(this.state)} />
        </Form>
      </Container>
    );
  }
}
