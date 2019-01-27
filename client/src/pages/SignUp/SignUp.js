import React, { Component } from "react";
//import { Link } from "react-router-dom";
import API from "../../utils/API";
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Jumbotron
} from "reactstrap";
//import "../SignUp/SignUp.css";
import "./SignUp.css";

export default class SignUp extends Component {
  state = {
    username: "",
    password: "",
    confirmPassword: "",
    usernameValid: "",
    passwordValid: "",
    confirmPasswordValid: "",
    valid: { username: "", password: "", confirmPassword: "" }
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState(
      {
        [name]: value
      },
      this.validate(name, value)
    );
    // if (name === "confirmPassword") {
    //   console.log(event.target);
    //   //event.target.setAttribute("valid", "");
    //   this.setState({ passwordValid: "is-valid" });
    // }
  };

  validate = (field, value) => {
    let other = "";

    switch (field) {
      case "username":
        other = "usernameValid";
        break;
      case "password":
        other = "passwordValid";
        break;
      case "confirmPassword":
        other = "confirmPasswordValid";
        break;
    }
    if (value.length > 6) {
      this.setState({ [other]: "is-valid" }, () => console.log(this.state));
    } else {
      this.setState({ [other]: "is-invalid" }, () => console.log(this.state));
    }
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
        <Jumbotron className="formJumbo">
          <Form>
            <FormGroup row>
              <Label for="username">
                Username<span className="asterisk">&nbsp;*</span>
              </Label>

              <Input
                className={this.state.usernameValid}
                value={this.state.username}
                onChange={this.handleInputChange}
                type="text"
                name="username"
                id="username"
              />
            </FormGroup>
            <FormGroup row>
              <Label for="password">
                Password<span className="asterisk">&nbsp;*</span>
              </Label>

              <Input
                //{this.state.passwordValid}
                className={this.state.passwordValid}
                value={this.state.password}
                onChange={this.handleInputChange}
                type="password"
                name="password"
                id="password"
              />
            </FormGroup>
            <FormGroup row>
              <Label for="confirmPassword">
                Confirm Password<span className="asterisk">&nbsp;*</span>
              </Label>

              <Input
                //valid
                className={this.state.confirmPasswordValid}
                value={this.state.confirmPassword}
                onChange={this.handleInputChange}
                type="password"
                name="confirmPassword"
                id="confirmPassword"
              />
            </FormGroup>
            <FormGroup check row>
              {/* <Col sm={{ size: 10, offset: 2 }}> */}
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
              {/* </Col> */}
            </FormGroup>
            {/* <Button onClick={() => console.log(this.state)} /> */}
          </Form>
        </Jumbotron>
      </Container>
    );
  }
}
