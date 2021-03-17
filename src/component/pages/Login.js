import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signin, signInWithGoogle } from "../helpers/auth";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      email: "",
      password: "",
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
      await signin(this.state.email, this.state.password);
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
        <form
          style={{ padding: "5rem" }}
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <h1>
            Login to
            <Link to="/">Chatty</Link>
          </h1>
          {/* <p>Fill in the form below to login to your account.</p> */}
          <div>
            <input
              className="input-login"
              placeholder="Email"
              name="email"
              type="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </div>
          <div>
            <input
              className="input-login"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
              type="password"
            />
          </div>
          <div className="content-login">
            {this.state.error ? <p>{this.state.error}</p> : null}
            <button className="btn btn-login" type="submit">
              Login
            </button>
            <div>or</div>
            {/* <p>Or</p> */}
            <button
              className="btn btn-google"
              onClick={this.googleSignIn}
              type="button"
            >
              Sign up with Google
            </button>
          </div>
          <hr />
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    );
  }
}
