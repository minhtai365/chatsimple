import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signup } from "../helpers/auth";
import { signin, signInWithGoogle } from "../helpers/auth";
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      email: "",
      password: "",
      name: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: "" });
    try {
      await signup(this.state.email, this.state.password,this.state.name);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }
  async googleSignIn() {
    try {
      await signInWithGoogle();
    } catch (error) {
      this.setState({ error: error.message });
    }
  }
  render() {
    return (
      <div className="center-content">
        <form style={{ padding: "5rem" }} onSubmit={this.handleSubmit}>
          <h1>
            Sign Up to
            <Link to="/">Chatty</Link>
          </h1>
          <p>Fill in the form below to create an account.</p>
          <div>
            <input
              className="input-login"
              placeholder="Email"
              name="email"
              type="email"
              onChange={this.handleChange}
              value={this.state.email}
            ></input>
          </div>
          <div>
            <input
              className="input-login"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
              type="password"
            ></input>
          </div>
          <div>
            <input
              className="input-login"
              placeholder="Your name"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
              type="text"
            ></input>
          </div>
          <div className="content-login">
            {this.state.error ? <p>{this.state.error}</p> : null}
            <button className="btn btn-login" type="submit">Sign up</button>
            <div>Or</div>
            <button className="btn btn-google" onClick={this.googleSignIn} type="button">
              Sign up with Google
            </button>
          </div>
          <hr></hr>
          <p>
            Already have an account? <Link to="/">Login</Link>
          </p>
        </form>
      </div>
    );
  }
}
