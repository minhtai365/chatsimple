import "./LGR.css";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { signin, signInWithGoogle, signup } from "../helpers/auth";
import { auth } from "../services/firebase";

export default function RegisterLogin() {
  const history = useHistory();
  const [valinput, setValinput] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [login, setLogin] = useState(false);
  // const [uid, setUid] = useState(auth().currentUser);
  // const [err, setErr] = useState('');
  const [statue, setStatue] = useState(true);
  const [error, setError] = useState(null);
  function changeSta() {
    setStatue(!statue);
  }
  const handleChange = (event) => {
    // console.log(event.target.value);
    setValinput((preState) => {
      return {
        ...preState,
        [event.target.name]: event.target.value,
      };
    });
    // setname(event.target.name);
    // setemail(e.target.email);
    // setpassword(e.target.password);
  };
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await signin(valinput.email, valinput.password);
      // history.push("/home");
    } catch (error) {
      setError(error.message);
    }
  }
  async function handleSubmitSignup(e) {
    e.preventDefault();
    setError("");
    try {
      await signup(valinput.email, valinput.password);
      // history.push("/home");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }
  async function googleSignIn() {
    try {
      // console.log('long');
      await signInWithGoogle();
      // history.push("/home");
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <div className="register-login ">
      <div className="center-login">
        <div className="btn-changestate">
          <div
            className={login ? "btn-changest" : "btn-changest  bg-btnchange"}
          >
            <div onClick={() => setLogin(false)} className="btn">
              Login
            </div>
          </div>
          <div
            className={login ? "btn-changest  bg-btnchange" : "btn-changest"}
          >
            <div onClick={() => setLogin(true)} className="btn">
              Register
            </div>
          </div>
        </div>
        <button onClick={googleSignIn} className="btn-gg mb-3">
          <i className="fab fa-google "></i>
        </button>
        <div className={login ? "form-box change" : "form-box"}>
          <div className="form-signin ">
            <form autoComplete="off" onSubmit={handleSubmit}>
              <h2>Sign in</h2>
              <div className="input-feld">
                <i className="fas fa-envelope"></i>
                <input
                  onChange={handleChange}
                  type="email"
                  name="email"
                  placeholder="Email"
                />
              </div>
              <div className="input-feld">
                <i className="fas fa-lock"></i>
                <input
                  onChange={handleChange}
                  type="password"
                  class="form-control"
                  name="password"
                  placeholder="Password"
                />
              </div>
              {error ? <p className="text-danger">{error}</p> : null}
              <button class="btn btn-primary btn-changest" type="submit">
                Login
              </button>
            </form>
          </div>
          <div className="form-signup">
            <form autoComplete="off" onSubmit={handleSubmitSignup}>
              <h3>Sign up</h3>
              <div className="input-feld">
                <i className="fas fa-envelope"></i>
                <input
                  onChange={handleChange}
                  type="email"
                  class="form-control"
                  name="email"
                  placeholder="Email"
                />
              </div>
              <div className="input-feld">
                <i className="fas fa-lock"></i>
                <input
                  onChange={handleChange}
                  type="password"
                  class="form-control"
                  name="password"
                  placeholder="Password"
                />
              </div>
              {error ? <p className="text-danger">{error}</p> : null}
              <button class="btn btn-primary btn-changest" type="submit">
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
