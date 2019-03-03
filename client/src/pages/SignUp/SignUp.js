import React, { Component } from "react";
//import { Link } from "react-router-dom";
import { Redirect, Link } from "react-router-dom";
import API from "../../utils/API";
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Jumbotron,
  FormFeedback
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
    valid: { username: "", password: "", confirmPassword: "" },
    redirectTo: null
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    // this.setState(
    //   {
    //     [name]: value
    //   },
    //   this.validate(name, value)
    // );

    this.setState({
      [name]: value
    });

    // if (name === "confirmPassword") {
    //   console.log(event.target);
    //   //event.target.setAttribute("valid", "");
    //   this.setState({ passwordValid: "is-valid" });
    // }
  };

  validate = (field, cb) => {
    console.log("validate length value");
    let other = "";
    let value = this.state[field];

    switch (field) {
      case "username":
        other = "usernameValid";
        break;
      case "password":
        other = "passwordValid";
        if (value.length > 6) {
          this.setState({ [other]: "is-valid" }, () =>
            this.validate("confirmPassword")
          );
        } else {
          this.setState({ [other]: "is-invalid" }, () =>
            console.log(this.state)
          );
        }
        break;
      case "confirmPassword":
        other = "confirmPasswordValid";
        if (
          value === this.state.password &&
          this.state.passwordValid === "is-valid"
        ) {
          this.setState({ [other]: "is-valid" }, () => console.log(this.state));
        } else {
          this.setState({ [other]: "is-invalid" }, () =>
            console.log(this.state)
          );
        }
        break;
    }

    if (cb) cb();
  };

  usernameValidate = data => {
    if (data.error) {
      this.setState({ usernameValid: "is-invalid" }, () =>
        console.log(this.state)
      );
    } else {
      this.setState({ usernameValid: "is-valid" }, () => this.nowLogIn());
    }
  };

  nowLogIn = something => {
    //this is in both sign up and log in maybe
    //find a way to do code reuse

    API.LoginUser({
      username: this.state.username,
      password: this.state.password
    }).then(response => {
      console.log("login response: ");
      console.log(response);
      //console.log("response.data: ", response.config);
      console.log("status: ", response.status);
      if (response.status === 200) {
        // update App.js state
        this.props.updateUser({
          loggedIn: true,
          username: response.data.username,
          userID: response.data.id
        });
        // update the state to redirect to home
        this.setState({
          redirectTo: "/"
        });
      }
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    //cleaner way to do this with destructuring or w/e?
    //this.validate("confirmPassword");

    if (
      this.state.username &&
      this.state.password &&
      this.state.confirmPassword &&
      this.state.confirmPasswordValid
    ) {
      API.saveUser({
        username: this.state.username,
        password: this.state.password
      })
        .then(response => {
          console.log("response: ", response);
          this.usernameValidate(response.data);
        })

        //.then(() => this.props.history.push(`/mics`))
        .catch(err => console.log("err: ", err));
      //   .then(() => this.props.history.push(`/mics`));

      console.log("state: ", this.state);

      //above redirect could be cleaner
    }
  };

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <Container>
          <Jumbotron id="signupJumbo">
            <h3 id="signupTitle">Create A Free Account</h3>
            <Form>
              <FormGroup row>
                <Label for="username">
                  Username<span className="asterisk">&nbsp;*</span>
                </Label>

                <Input
                  className={this.state.usernameValid}
                  value={this.state.username}
                  onChange={this.handleInputChange}
                  onBlur={() => this.validate("username")}
                  type="text"
                  name="username"
                  id="username"
                />
                <FormFeedback invalid="true">
                  That username is already taken. If this is you,{" "}
                  <Link to="/login" className="blue">
                    log in!
                  </Link>
                </FormFeedback>
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
                  onBlur={() => this.validate("password")}
                  type="password"
                  name="password"
                  id="password"
                />
                {/* <FormFeedback valid>You did very well</FormFeedback> */}
                <FormFeedback invalid="true">
                  Password is too short
                </FormFeedback>
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
                  onBlur={() => this.validate("confirmPassword")}
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                />
                {/* <FormFeedback valid>You did very well</FormFeedback> */}
                <FormFeedback invalid="true">
                  Passwords do not match
                </FormFeedback>
              </FormGroup>
              <FormGroup check row>
                {/* <Col sm={{ size: 10, offset: 2 }}> */}
                <Button
                  type="submit"
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
}
