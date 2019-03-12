import React, { Component } from "react";
//import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import API from "../utils/API";
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

//FormText, Row,
// IT IS POSSIBLE TO LET YOU KNOW
// WHETHER YOUR USERNAME OR PASS IS WRONG

export default class Login extends Component {
  state = {
    username: "",
    password: "",
    redirectTo: null,
    valid: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      API.LoginUser({
        username: this.state.username,
        password: this.state.password
      })
        .then(response => {
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
        })
        .catch(err => {
          console.log(err);
          //alert("username or password wrong");
          this.setState({ valid: "is-invalid" });
        });
      //   .then(() => this.props.history.push(`/mics`));

      console.log("be more");

      //above redirect could be cleaner
    }
  };

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <Container>
          <div id="loginBackground">
            <Jumbotron className="loginJumbo">
              <h3 id="loginTitle">Log In to OMP</h3>
              <Form>
                <FormGroup row>
                  <Label for="username">Username</Label>

                  <Input
                    className={this.state.valid}
                    value={this.state.username}
                    onChange={this.handleInputChange}
                    type="text"
                    name="username"
                    id="username"
                  />
                </FormGroup>
                <FormGroup row>
                  <Label for="password">Password</Label>

                  <Input
                    className={this.state.valid}
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    type="password"
                    name="password"
                    id="password"
                  />
                  <FormFeedback invalid="true">
                    Username or Password is incorrect
                  </FormFeedback>
                </FormGroup>
                {/* <FormGroup check row> */}
                <FormGroup>
                  {/* <Col sm={10}> */}
                  {/* <Col> */}
                  <Button
                    type="submit"
                    id="loginButton"
                    disabled={!(this.state.username && this.state.password)}
                    onClick={this.handleFormSubmit}
                  >
                    Log In
                  </Button>

                  {/* </Col> */}
                </FormGroup>
              </Form>
            </Jumbotron>
          </div>
        </Container>
      );
    }
  }
}
