import React, { Component } from "react";
//import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";
import classnames from "classnames";
//import "./Home.css";
import API from "../utils/API";
import {
  Container,
  Row,
  Col,
  Jumbotron,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import MapSolo from "../components/MapSolo";

// Form,
//   FormGroup,
//   Label,
//   Input,
//   Button,

class Home extends Component {
  state = {
    mics: [],
    day: "",
    activeTab: "1",
    HomeThing: "Home"
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

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
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
            {/* <Jumbotron>
              <Row>
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
            </Jumbotron> */}
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "1"
                  })}
                  onClick={() => {
                    this.toggle("1");
                  }}
                >
                  List View
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "2"
                  })}
                  onClick={() => {
                    this.toggle("2");
                  }}
                >
                  Map View
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Jumbotron>
                  {/* <Row>
                    <h3 id="title"> Welcome to OMP </h3>
                  </Row> */}
                  {this.state.mics.length ? (
                    <div>
                      {this.state.mics.map(mic => (
                        <EventCard key={mic._id} mic={mic} />
                      ))}
                    </div>
                  ) : (
                    <h5>nothin' doin'</h5>
                  )}
                </Jumbotron>
              </TabPane>
              <TabPane tabId="2">
                <Jumbotron>
                  <MapSolo mics={this.state.mics} />
                  {/* <MapSolo /> */}
                </Jumbotron>
              </TabPane>
            </TabContent>
          </Col>
          {/* <button
            onClick={() =>
              console.log("HOME state mics length ", this.state.mics.length)
            }
          >
            click for info HOME.js
          </button> */}
          {/* <button
            onClick={() =>
              this.setState({ HomeThing: this.state.HomeThing + 1 })
            }
          >
            update homething state
          </button> */}
        </Row>
      </Container>
    );
  }
}

export default Home;

//<h5>{this.state.mics[0].micName}</h5>

/* <h5 key={mic._id}>
  <Link to={"/mics/" + mic._id}>{mic.micName}</Link>
</h5>; */
