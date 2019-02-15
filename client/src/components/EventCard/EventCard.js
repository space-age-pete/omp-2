import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Button,
  CardTitle,
  CardText,
  CardSubtitle,
  CardBody,
  Col,
  Row
} from "reactstrap";
import "./EventCard.css";

// CardImg,
// CardDeck,

export default class EventCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mic: this.props.mic
    };
  }

  render() {
    return (
      <div>
        <Card className="ECardCard">
          <CardBody>
            <Row>
              <Col xs="4">
                <img
                  className="ECardIMG"
                  // width="100%"
                  src={"/" + this.state.mic.img}
                  alt=""
                />
              </Col>
              <Col xs="8">
                <CardTitle>
                  {this.state.mic.micName} at {this.state.mic.locationName}
                </CardTitle>
                <CardSubtitle>List at {this.state.mic.signUpTime}</CardSubtitle>
                <CardText>Show at {this.state.mic.startTime}</CardText>
                <Button>
                  <Link to={"/mics/" + this.state.mic._id}>More Info</Link>
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}
