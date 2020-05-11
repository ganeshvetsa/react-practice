import React, {Component} from "react";
import validations from "./Validations";
import "./Username.scss"

class Username extends Component {

  onBlur = (e) => {
    if (validations.validateUsername(e.target.value)) {
      this.setState({isError: false});
      this.props.onBlur(
          {value: e.target.value, error: false, errorMessage: null});
    } else {
      this.props.onBlur(
          {
            value: e.target.value,
            error: true,
            errorMessage: "Invalid Email Address"
          });
    }
  };

  render() {
    let {placeholder, className, error, errorMessage = "Invalid Email Address", onBlur, ...otherProps} = this.props;
    return <div id="username">
      <input {...otherProps} type="text"
             placeholder={placeholder}
             className={`username1 ${className}`}
             onBlur={this.onBlur}/>
      {error && <label className="label">{errorMessage}</label>}
    </div>
  }
}

export default Username;