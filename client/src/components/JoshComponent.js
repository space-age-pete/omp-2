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

// CardImg,
// CardDeck,

export default class EventCard extends React.Component {
  //   constructor(props) {
  //     super(props);

  //     this.state = {
  //       mic: this.props.mic
  //     };
  //}
  state = {
    thing1: "starter text"
  };

  componentDidMount() {
    console.log("JOSH component did mount");
    this.setState({ thing1: this.props.parentThing });
  }

  componentDidUpdate() {
    console.log("JOSH component did update");
    if (this.state.thing1 != this.props.parentThing)
      this.setState({ thing1: this.props.parentThing });
  }

  render() {
    return (
      <div>
        <Card className="ECardCard">
          <CardBody>
            <Row>
              <Col xs="12">
                <CardTitle>THIS.STATE.THING1: {this.state.thing1}</CardTitle>
                <CardSubtitle>
                  THIS.STATE.PARENTTHING: {this.props.parentThing}
                </CardSubtitle>
                <CardText>Nevermind</CardText>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}
