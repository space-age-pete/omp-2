import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../utils/API";
import { Container, Row, Col, Button, Jumbotron, Alert } from "reactstrap";
import Rating from "react-rating";

class Detail extends Component {
  state = {
    mic: {},
    user: {},
    alertVisible: false
  };
  // When this component mounts, grab the mic with the _id of this.props.match.params.id
  // e.g. localhost:3000/mics/599dcb67f0f16317844583fc
  componentDidMount() {
    console.log("this.props", this.props);
    this.loadMic();
    //this.loadUser();
  }

  loadMic = () => {
    API.getMic(this.props.match.params.id)
      .then(res => {
        this.setState({ mic: res.data });
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  // loadUser = () => {
  //   API.getUser()
  //     .then(res => {
  //       this.setState({ user: res.data });
  //     })
  //     .catch(err => console.log(err));
  // };

  deleteThis = event => {
    event.preventDefault();
    if (window.confirm("Are you sure you want to delete this event?")) {
      API.deleteMic(this.props.match.params.id)
        .then(res => {
          console.log(res.data);
          //this.props.history.push(`/mics`);
        })
        .catch(err => console.log(err));
    }
  };

  //NOT CURRENTLY BEING USED
  updateMic = event => {
    event.preventDefault();
    // what I've found out is this:
    // you can use put to add a field not currently in the instance
    // but only if that field has since been added to the model
    API.updateMic(this.props.match.params.id, { comments: "snack" })
      .then(res => {
        console.log(res.data);
        //this.props.history.push(`/mics`);
      })
      .catch(err => console.log(err));
  };

  addRating = rating => {
    console.log("rating value: ", rating);
  };

  addToFavorites = event => {
    event.preventDefault();

    API.addToFavorites(this.props.userID, {
      favorites: this.props.match.params.id
    })
      .then(res => {
        //console.log(res.data);
        //this.props.history.push(`/mics`);
        this.alertToggle();
      })
      .catch(err => console.log(err));
  };

  //Probably get rid of this business
  alertToggle = () => {
    this.setState({ alertVisible: true }, () =>
      setTimeout(() => this.setState({ alertVisible: false }), 3000)
    );
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

  render() {
    return (
      //<Container className="detailContainer">
      <Container>
        <h1>{this.props.location.state}</h1>
        <Row>
          <Col sm={4}>
            {/* <Jumbotron className="detailJumbo">{this.imageTester()}</Jumbotron> */}
            {this.imageTester()}
            <Jumbotron className="detailJumbo">
              <Rating
                initialRating={4.5}
                onClick={this.addRating}
                readonly={!this.props.userID}
              />

              <br />
              {this.props.userID && (
                <Button className="detailButton" onClick={this.addToFavorites}>
                  Add to My Favorites
                </Button>
              )}
              <br />
              {this.props.userID === this.state.mic.userID && (
                <div>
                  <Button className="detailButton" onClick={this.deleteThis}>
                    Delete This Mic
                  </Button>
                  <br />

                  <Link to={"/editmic/" + this.props.match.params.id}>
                    <Button className="detailButton">Edit This Mic</Button>
                  </Link>
                </div>
              )}
            </Jumbotron>
          </Col>
          <Col sm={8}>
            <Jumbotron className="detailThickJumbo">
              <Row>
                <Col sm={12}>
                  <h1>
                    <b>{this.state.mic.micName}</b>
                  </h1>
                  <br />
                  <h3>
                    {this.state.mic.day}s at {this.state.mic.locationName}
                  </h3>
                  <h5>{this.state.mic.address}</h5>
                  <br />
                  <h4>List at {this.state.mic.signUpTime}</h4>
                  <h4>Show at {this.state.mic.startTime}</h4>
                  <br />
                  {/* <Button onClick={this.updateMic}>Add a Snack</Button> */}
                </Col>
              </Row>
              <br />
            </Jumbotron>
          </Col>
        </Row>
        <Alert color="success" isOpen={this.state.alertVisible}>
          Added to Favorites
        </Alert>
      </Container>
    );
  }
}

export default Detail;
