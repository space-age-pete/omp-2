import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import { Container, Row, Col, Button, Jumbotron, Alert } from "reactstrap";
//import "./Detail.css";

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

  alertToggle = () => {
    this.setState({ alertVisible: !this.state.alertVisible });
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
              {/* <Button onClick={this.updateMic}>Add a Snack</Button> */}

              {this.props.userID && (
                <Button onClick={this.addToFavorites}>
                  Add to My Favorites
                </Button>
              )}
            </Col>
          </Row>
          <br />
          {this.props.userID === this.state.mic.userID && (
            <div>
              <Button onClick={this.deleteThis}>DELETE THIS MIC</Button>–––
              <Button>
                <Link to={"/editmic/" + this.props.match.params.id}>
                  EDIT THIS MIC
                </Link>
              </Button>
            </div>
          )}
          <Alert color="success" isOpen={this.state.alertVisible}>
            This is a success alert — check it out!
          </Alert>
        </Jumbotron>
      </Container>
    );
  }
}

export default Detail;
