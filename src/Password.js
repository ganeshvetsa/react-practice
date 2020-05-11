import React, {Component} from "react";
import "./password.scss"

class Password extends Component {
  onPasswordChange = (e) => {
    //validatePassword
    if (e.target.value.length > 5) {
      this.props.onBlur({value: e.target.value, errorMessage: null});
    } else {
      this.props.onBlur({
        value: e.target.value,
        errorMessage: "password should be atleast 5 characters"
      })
    }
  };

  render() {
    let {onBlur, error, className, ...otherProps} = this.props;
    return <div id="password">
      <input {...otherProps} className={`${className} password`} type="password"
             onBlur={this.onPasswordChange}/>
      {error && <label className="label">{error}</label>}
    </div>
  }
}

export default Password;