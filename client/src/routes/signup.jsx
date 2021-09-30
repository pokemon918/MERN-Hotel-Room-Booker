import React from "react";
import Joi from "joi-browser";
import Form from "../components/form";
import * as userService from "../services/userService";

class SignUp extends Form {
  constructor() {
    super();
    this.state = {
      data: {
        name: "",
        email: "",
        password: "",
      },
      errors: {},
    };
  }

  schema = {
    name: Joi.string().required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };
  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      localStorage.setItem("token", response.headers["x-auth-token"]);
      this.props.history.push("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };
  render() {
    return (
      <div className="container-fluid p-0">
        <div className="container">
          <h1 className="display-4 mt-4">Register User</h1>
          <form className="mt-5" onSubmit={this.handleSubmit}>
            {this.renderInput("name", "Name")}
            {this.renderInput("email", "Email")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Register")}
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
