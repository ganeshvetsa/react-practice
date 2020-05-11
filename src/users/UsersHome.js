import React, {Component} from "react";
import {Link} from "react-router-dom";

class UsersHome extends Component {

  render() {
    let {path} = this.props.match;
    console.log("in Users home");
    return <div> {" i am in Users home"}
      <Link to={`${path}/create`}> Create user</Link>
    </div>
  }
}

export default UsersHome;