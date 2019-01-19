import React, { Component } from "react";
import { Link } from "react-router-dom";
import EventCard from "../../components/EventCard";
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
    this.loadMics(this.state.day);
  }

  componentDidUpdate() {
    //this.loadMics();
    //console.log("update: ", this.state.mics);
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    setTimeout(() => console.log(this.state.day), 300);
  };

  loadMics = day => {
    let theParams = day ? { day: day } : "";
    API.getMics({ params: theParams })
      .then(res => {
        console.log(res.data);
        this.setState({ mics: res.data });
      })
      .catch(err => console.log(err));

    //console.log("state: ", this.state);
  };

  render() {
    return (
      <Container>
        <Row>
          <h1 id="title"> Welcome to OMP </h1>
        </Row>
        {/* <Form row>
          <FormGroup row>
            <Label for="day" sm={2}>
              Day of Week
            </Label>

            <Col sm={8}>
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
            <Col sm="2">
              <Button onClick={() => this.loadMics(this.state.day)}>
                Submit
              </Button>
            </Col>
          </FormGroup>
        </Form> */}
        <Row>
          <Col id="maincol" xs="10">
            {this.state.mics.length ? (
              <div>
                {this.state.mics.map(mic => (
                  <EventCard key={mic._id} mic={mic} />
                  // <h5 key={mic._id}>
                  //   <Link to={"/mics/" + mic._id}>{mic.micName}</Link>
                  // </h5>
                ))}
              </div>
            ) : (
              <h5>nothin' doin'</h5>
            )}
          </Col>
          <Col xs="2">
            <h5 onClick={() => this.loadMics("Sunday")}>Sunday</h5>
            <br />
            <h5 onClick={() => this.loadMics("Monday")}>Monday</h5>
            <br />
            <h5 onClick={() => this.loadMics("Tuesday")}>Tuesday</h5>
            <br />
            <h5 onClick={() => this.loadMics("Wednesday")}>Wednesday</h5>
            <br />
            <h5 onClick={() => this.loadMics("Thursday")}>Thursday</h5>
            <br />
            <h5 onClick={() => this.loadMics("Friday")}>Friday</h5>
            <br />
            <h5 onClick={() => this.loadMics("Saturday")}>Saturday</h5>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;

//<h5>{this.state.mics[0].micName}</h5>

{
  /* <h5 key={mic._id}>
  <Link to={"/mics/" + mic._id}>{mic.micName}</Link>
</h5>; */
}
