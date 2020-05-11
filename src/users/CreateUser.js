import React, {Component} from "react";
import Username from "../Username";
import Password from "../Password";
import "./CreateUser.scss"
import usersApi from "./api/UsersApi";

class CreateUser extends Component {
  state = {
    values: {
      firstName: "",
      lastName: "",
      username: "",
      password: ""
    },
    error: {
      username: null,
      password: null
    },
    isSuccess: null,
    saveStatus: null
  }
  onUsernameChange = (object) => {
    this.setState({
      values: {
        ...this.state.values,
        username: object.value
      },
      error: {
        ...this.state.error,
        username: object.error
      }
    })
  };
  send = async (e) => {
    let currentdate = new Date();

    let user = await usersApi.createUser({
      "firstName": this.state.values.firstName,
      "lastName": this.state.values.lastName,
      "email": this.state.values.username,
      "password": this.state.values.password,
      "createdAt": currentdate.getDate(),
      "createdBy": this.state.values.username
    });
    if (user == null) {
      this.setState({isSuccess: false, saveStatus: "Failed to save"});
    } else {
      this.setState({isSuccess: true, saveStatus: "Saved successfully"});
    }
  };

  onPasswordChange = (object) => {
    this.setState({
      values: {
        ...this.state.values,
        password: object.value
      },
      error: {
        ...this.state.error,
        password: object.errorMessage
      }
    })
  };
  onChange = (e) => {
    let id = e.target.id;
    console.log(e.target);
    console.log(e.target.id);
    this.setState({
      ...this.state,
      values: {
        ...this.state.values,
        [id]: e.target.value
      }
    });
  };

  render() {
    return <div id="create-user">
      <div className={"create-user-group"}>
        <input type="text" id="firstName"
               placeholder={"First Name"}
               onChange={this.onChange}
               value={this.state.values.firstName}/>
        <input type="text" id="lastName"
               placeholder={"last Name"}
               onChange={this.onChange}
               value={this.state.values.lastName}/>
        <Username onBlur={this.onUsernameChange}
                  value={this.state.values.username}
                  placeholder={"Email"}
                  className={"username"}
                  onChange={(e) => {
                    this.setState({
                      ...this.state,
                      values: {
                        ...this.state.values,
                        username: e.target.value
                      }
                    })
                  }}/>
        <Password onBlur={this.onPasswordChange}
                  value={this.state.values.password}
                  className={"password"}
                  placeholder={"Password"}
                  onChange={(e) => {
                    this.setState({
                      ...this.state,
                      values: {
                        ...this.state.values,
                        password: e.target.value
                      }
                    })
                  }}
                  error={this.state.error.password}/>
        <button className="save" onClick={this.send}>save</button>
        {this.state.saveStatus && <label className={
          this.state.isSuccess ? "success" : "failure"
        }>{this.state.saveStatus}</label>}
      </div>
    </div>
  }
}

export default CreateUser;