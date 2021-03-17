import React from "react";
import { Link } from "react-router-dom";

export default function LoginRegister() {
  return (
    <div className="my-container">
      <div className="forms-container">
        <div className="signin-signup">
          <form className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                className="form-control"
                name="emai"
                placeholder="Email"
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
              />
            </div>
            <input type="submit" value="Login" className="btn solid" />
            <p class="social-text">Or</p>
            <div className="social-media">
              <Link className="social-icon">
                <i className="fab fa-google"></i>
              </Link>
            </div>
          </form>

          <form className="sign-up-form">
            <h2 className="title">Sign up</h2>

            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Name"
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Email"
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
              />
            </div>
            <input type="submit" value="Sign up" className="btn btn-primary" />
            <p class="social-text">Or</p>
            <div className="social-media">
              <Link className="social-icon">
                <i className="fab fa-google"></i>
              </Link>
            </div>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Sign in</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button className="btn transparent">Sign up</button>
          </div>
          <img src="img/log.svg" className="image" alt="" />
        </div>

        <div className="panel right-panel">
          <div className="content">
            <h3>Sign up</h3>
            <button className="btn stransparent">Sign in</button>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
          </div>
          <img src="img/register.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
}
