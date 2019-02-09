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
        <Col id="maincol" xs="3">
            <Jumbotron>
              <h5 onClick={() => this.loadMics("day", "Sunday")}>Sunday</h5>
              <h5 onClick={() => this.loadMics("day", "Monday")}>Monday</h5>
              <h5 onClick={() => this.loadMics("day", "Tuesday")}>Tuesday</h5>
              <h5 onClick={() => this.loadMics("day", "Wednesday")}>
                Wednesday
              </h5>
              <h5 onClick={() => this.loadMics("day", "Thursday")}>Thursday</h5>
              <h5 onClick={() => this.loadMics("day", "Friday")}>Friday</h5>
              <h5 onClick={() => this.loadMics("day", "Saturday")}>Saturday</h5>
              <h5 onClick={() => this.loadMics("", "")}>All Mics</h5>
              <h5 onClick={() => this.loadMics("userID", this.props.userID)}>
                My Mics
              </h5>
            </Jumbotron>
          </Col>
          {/* <Col id="maincol" xs="9"> */}
          <Col xs="9">
            <Jumbotron>
              <Row>
                {/* <h3 id="title"> Welcome to OMP </h3> */}
                <h3 id="title"> Welcome to OMP </h3>
              </Row>
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
            </Jumbotron>
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
