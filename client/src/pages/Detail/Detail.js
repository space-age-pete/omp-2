import React, { Component } from "react";
//import { Link } from "react-router-dom";
import API from "../../utils/API";

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

  fileSelectedHandler = event => {
    console.log(event.target.files[0]);
  };

  imageTester = um => {
    if (this.state.mic.img)
      return (
        <img
          src={"/" + this.state.mic.img}
          alt={"localhost:3001/" + this.state.mic.img}
        />
      );
  };

  render() {
    return (
      <div>
        <h1>
          {this.state.mic.micName} at {this.state.mic.locationName}
        </h1>
        {Object.keys(this.state.mic).map(key => (
          <h5>
            {key}: {this.state.mic[key]}
          </h5>
        ))}
        <hr />
        <input type="file" onChange={this.fileSelectedHandler} />
        {this.imageTester()}
      </div>
    );
  }
}

export default Detail;
