import React, { Component } from "react";
import { Link } from "react-router-dom";

class VerifyEmail extends Component {
  state = {};
  render() {
    return (
      <div className="container-fluid p-0 ">
        <div className="container">
          <div className="alert alert-primary">
            Click on the Link sent to your Email to reset your Password.
          </div>
          <Link to="/login" className="btn btn-primary btn-sm">
            Back to Login Page
          </Link>
        </div>
      </div>
    );
  }
}

export default VerifyEmail;
