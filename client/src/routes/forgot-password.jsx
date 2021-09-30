import React from "react";
import Joi from "joi-browser";
import Form from "../components/form";

class ForgotPassword extends Form {
  constructor() {
    super();
    this.state = {
      data: {
        email: "",
      },
      errors: {},
    };
  }

  schema = {
    email: Joi.string().email().required().label("Email"),
  };

  doSubmit = async () => {};
  render() {
    return (
      <div className="container-fluid p-0">
        <div className="container">
          <h1 className="display-4 mt-4">Verify Account</h1>
          <form className="mt-5" onSubmit={this.handleSubmit}>
            {this.renderInput("email", "Email")}
            {this.renderButton("Verify Email")}
          </form>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
