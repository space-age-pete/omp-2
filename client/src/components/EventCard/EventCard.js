import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardDeck,
  CardSubtitle,
  CardBody,
  Col,
  Row
} from "reactstrap";
import "./EventCard.css";

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
                  alt="Card image cap"
                />
              </Col>
              <Col xs="8">
                <CardTitle>{this.state.mic.micName}</CardTitle>
                <CardSubtitle>{this.state.mic.locationName}</CardSubtitle>
                <CardText>{this.state.mic.day}</CardText>
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
