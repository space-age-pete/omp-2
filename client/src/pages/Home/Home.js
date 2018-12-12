import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import API from "../../utils/API";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

class Home extends Component {
  state = {
    mics: [],
    day: ""
  };

  componentDidMount() {
    this.loadMics();
  }

  componentDidUpdate() {
    console.log("update: ", this.state.mics);
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    //console.log(this.state.day);
  };

  loadMics = () => {
    let theParams = this.state.day ? { day: this.state.day } : "";
    API.getMics({ params: theParams })
      .then(res => {
        console.log(res.data);
        this.setState({ mics: res.data });
      })
      .catch(err => console.log(err));

    console.log("state: ", this.state.mics);
  };

  render() {
    return (
      <Container>
        <Row>
          <h1 id="title"> Welcome to OMP </h1>
        </Row>
        <Row>
          <Form>
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
            <Button onClick={this.loadMics}>Submit</Button>
          </Form>
        </Row>
        <Row>
          <Col id="maincol" xs="8">
            {this.state.mics.length ? (
              <div>
                {this.state.mics.map(mic => (
                  <h5 key={mic._id}>
                    <Link to={"/mics/" + mic._id}>{mic.micName}</Link>
                  </h5>
                ))}
              </div>
            ) : (
              <h5>nothin' doin'</h5>
            )}
          </Col>
          <Col xs="4">
            <Link to={"/newmic"}>Add a Mic</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;

//<h5>{this.state.mics[0].micName}</h5>
