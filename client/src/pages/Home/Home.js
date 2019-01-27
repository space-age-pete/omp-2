import React, { Component } from "react";
import { Link } from "react-router-dom";
import EventCard from "../../components/EventCard";
import "./Home.css";
import API from "../../utils/API";
import { Container, Row, Col, Jumbotron } from "reactstrap";

// Form,
//   FormGroup,
//   Label,
//   Input,
//   Button,

class Home extends Component {
  state = {
    mics: [],
    day: ""
  };

  componentDidMount() {
    this.loadMics("", this.state.day);
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

  loadMics = (key, value) => {
    //let theParams = day ? { day: day } : "";
    let theParams = { [key]: value };
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
        <Jumbotron>
          <Row>
            <Col id="maincol" xs="9">
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
            <Col xs="3">
              <h4 onClick={() => this.loadMics("day", "Sunday")}>Sunday</h4>
              <br />
              <h4 onClick={() => this.loadMics("day", "Monday")}>Monday</h4>
              <br />
              <h4 onClick={() => this.loadMics("day", "Tuesday")}>Tuesday</h4>
              <br />
              <h4 onClick={() => this.loadMics("day", "Wednesday")}>
                Wednesday
              </h4>
              <br />
              <h4 onClick={() => this.loadMics("day", "Thursday")}>Thursday</h4>
              <br />
              <h4 onClick={() => this.loadMics("day", "Friday")}>Friday</h4>
              <br />
              <h4 onClick={() => this.loadMics("day", "Saturday")}>Saturday</h4>
              <br />
              <h4 onClick={() => this.loadMics("", "")}>All Mics</h4>
              <br />
              <h4 onClick={() => this.loadMics("userID", this.props.userID)}>
                My Mics
              </h4>
            </Col>
          </Row>
        </Jumbotron>
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
