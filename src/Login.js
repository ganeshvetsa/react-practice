import React, {Component} from "react";
import './Login.scss';
import {Link} from "react-router-dom";
import Username from "./Username";

//Always try to keep one source of truth
// parent--> child use getDerivedStateFromProps
// child--->parent use componentDidUpdate
//defaultValue,Onblur goes together
//value,onChange goes together
//if input has value = null then it will be called uncontrolled component
// so always use username: "" instead of username : null

class Login extends Component {
  state = {
    value: {
      username: "", // do not set to null --see error above
      password: ""
    },
    error: {
      username: null,
      password: null,
    }
  };
  onUsernameChange = (object) => {
    this.setState({
      value: {
        ...this.state.value,
        username: object.value
      },
      error: {
        ...this.state.error,
        username: object.errorMessage
      }
    });
  };
  onSignIn = (e) => {
    let {username, password} = this.state;
    if (username == null) {
      this.setState({
        error: {
          ...this.state.error,
          username: "I am error"
        }
      })
    }
    // console.log(e.target.id);
  };

  render() {
    return <div className="login">
      <div className="form">
        <div className="label">Sign in to your account</div>
        <Username placeholder="test@gmail.com"
                  value={this.state.value.username}
                  error={!!this.state.error.username}
                  errorMessage={this.state.error.username}
                  onBlur={this.onUsernameChange}
                  onChange={(e) => this.setState({
                    value: {
                      ...this.state.value,
                      username: e.target.value
                    }
                  })}
                  className="username"/>
        <input type="text" placeholder="password" className="password"/>
        <Link className="forgot-password" to="/forgot-password">Forgot your
          password?</Link>
        <button id="sign-in" name="sign ooo" className="sign-in"
                onClick={this.onSignIn}>Sign in
        </button>
      </div>
    </div>
  }
}

export default Login;