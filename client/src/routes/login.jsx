import React from "react";
import Joi from "joi-browser";
import Form from "../components/form";
import { Link } from "react-router-dom";
import { login } from "../services/authService";

class Login extends Form {
  constructor() {
    super();
    this.state = {
      data: {
        email: "",
        password: "",
      },
      errors: {},
    };
  }

  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };
  doSubmit = async () => {
    try {
      const { data } = this.state;
      await login(data.email, data.password);
      window.location = "/";
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
          <h1 className="display-4 mt-4">Login</h1>
          <form className="mt-5" onSubmit={this.handleSubmit}>
            {this.renderInput("email", "Email")}
            {this.renderInput("password", "Password", "password")}
            <div className="my-0 d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3">
              <Link className="text-dark" to="/forgot-password">
                Forgot Password ?
              </Link>
            </div>
            <hr />
            {this.renderButton("Login")}
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
