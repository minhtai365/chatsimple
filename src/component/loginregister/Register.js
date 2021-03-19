import React, { useEffect, useState } from "react";
import "./register.css";
import { Link, useHistory } from "react-router-dom";
import { signin, signInWithGoogle, signup } from "../helpers/auth";
import { auth } from "../services/firebase";
export default function Register() {
  const history = useHistory();
  const [valinput, setValinput] = useState({
    email: "",
    password: "",
    name: "",
  });
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
      history.push("/home");
    } catch (error) {
      setError(error.message);
    }
  }
  async function handleSubmitSignup(e) {
    e.preventDefault();
    setError("");
    try {
      await signup(valinput.email, valinput.password);
      history.push("/home");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }
  async function googleSignIn() {
    try {
      // console.log('long');
      await signInWithGoogle();
      history.push("/chat");
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <div className="mycontainer">
      <div className="form-content">
        <div
          className={
            statue ? "to-left form-content__signin" : "form-content__signin"
          }
        >
          <form className="my-form" autoComplete="off" onSubmit={handleSubmit}>
            <h2>Sign in</h2>
            <div className="input-feld">
              <i className="fas fa-envelope"></i>
              <input
                onChange={handleChange}
                type="email"
                // class="form-control"
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
            {error?<p className='text-danger'>{error}</p>:null}
            <button class="btn btn-primary" type="submit">
              Login
            </button>
            <p>OR</p>
            <button onClick={googleSignIn} className="btn-icon">
              <i className="fab fa-google"></i>
            </button>
          </form>
        </div>
        <div
          className={
            !statue ? "to-right form-content__signup" : "form-content__signup"
          }
        >
          <form
            className="my-form"
            autoComplete="off"
            onSubmit={handleSubmitSignup}
          >
            <h3>Sign up</h3>
            <div className="input-feld">
              {/* <i className="fas fa-user"></i> */}
              {/* <input
                onChange={handleChange}
                type="name"
                class="form-control"
                name="name"
                placeholder="Name"
              /> */}
            </div>
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
            {error?<p className='text-danger'>{error}</p>:null}
            <button class="btn btn-primary" type="submit">
              Sign up
            </button>
            <p>OR</p>
            <button onClick={googleSignIn} className="btn-icon">
              <i className="fab fa-google"></i>
            </button>
          </form>
        </div>
      </div>
      <div className="detail-content">
        <div className={!statue ? "to-right leftcontent" : "leftcontent"}>
          <div className="text-content">
            <h3>Sign in</h3>
            <p className="text-content-p">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button className="btn btn-change" onClick={() => changeSta()}>
              Sign in
            </button>
          </div>
          <img className="img" src="img/log.svg" />
        </div>
        <div className={statue ? "to-left rightcontent" : "rightcontent"}>
          <div className="text-content">
            <h3>Sign up</h3>
            <p className="text-content-p">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>

            <button className="btn btn-change" onClick={() => changeSta()}>
              Sign Up
            </button>
          </div>
          <img className="img" src="img/register.svg" />
        </div>

        <div className={!statue ? "bgg-move bgg" : "bgg"}></div>
      </div>
    </div>
  );
}
