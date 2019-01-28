import React, { Component } from "react";
//import { Link } from "react-router-dom";
import API from "../../utils/API";
import { Container, Row, Col, Button, Jumbotron } from "reactstrap";
import "./Detail.css";

class Detail extends Component {
  state = {
    mic: {}
  };
  // When this component mounts, grab the mic with the _id of this.props.match.params.id
  // e.g. localhost:3000/mics/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getMic(this.props.match.params.id)
      .then(res => {
        this.setState({ mic: res.data });
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }

  deleteThis = event => {
    event.preventDefault();
    if (window.confirm("Are you sure you want to delete this event?")) {
      API.deleteMic(this.props.match.params.id)
        .then(res => {
          console.log(res.data);
          this.props.history.push(`/mics`);
        })
        .catch(err => console.log(err));
    }
  };

  imageTester = um => {
    if (this.state.mic.img)
      return (
        <img
          src={"/" + this.state.mic.img}
          alt={"localhost:3001/" + this.state.mic.img}
          className="micDetailIMG"
        />
      );
  };

  // addToFavorites = () => {

  // }

  render() {
    return (
      //<Container className="detailContainer">
      <Container>
        <Jumbotron>
          <Row>
            <Col sm={this.state.mic.img ? 4 : 0}>{this.imageTester()}</Col>
            <Col sm={this.state.mic.img ? 8 : 12}>
              <h1>{this.state.mic.micName}</h1>
              <br />
              <h3>
                {this.state.mic.day}s at {this.state.mic.locationName}
              </h3>
              <h5>{this.state.mic.address}</h5>
              <br />
              <br />
              <h4>List at {this.state.mic.signUpTime}</h4>
              <h4>Show at {this.state.mic.startTime}</h4>
            </Col>
          </Row>
          <br />
          <Button onClick={this.deleteThis}>DELETE THIS MIC</Button>
        </Jumbotron>
      </Container>
    );
  }
}

export default Detail;
