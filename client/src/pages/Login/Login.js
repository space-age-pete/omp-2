import React, { Component } from "react";
//import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
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

//FormText, Row,

export default class Login extends Component {
  state = {
    username: "josh",
    password: "josh",
    redirectTo: null
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
      API.LoginUser({
        username: this.state.username,
        password: this.state.password
      })
        .then(response => {
          console.log("login response: ");
          console.log(response);
          console.log("response.data: ", response.config);
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
        .catch(err => console.log(err));
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
          <Jumbotron className="formJumbo">
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
          </Jumbotron>
        </Container>
      );
    }
  }
}
