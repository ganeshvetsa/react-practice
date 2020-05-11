import React, {Component} from "react";
import "./Home.scss"
import {withRouter} from "react-router-dom";

class Country extends Component {
  state = {};

  render() {
    return <>
      <div>{this.props.match.path}</div>
      <div>{this.props.match.params.id}</div>
    </>
  }
}

export default withRouter(Country);