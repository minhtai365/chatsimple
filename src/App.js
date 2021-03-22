import { auth, db } from "./component/services/firebase";

import React, { Component, useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Signup from "./component/pages/Signup";
import Login from "./component/pages/Login";
import EditPro from "./component/pages/EditPro";
import LoginRegister from "./component/loginregister/LoginRegister";
import Register from "./component/loginregister/Register";
import ChatForm from "./component/pages/ChatForm";
import Home from "./component/pages/Home";
import RegisterLogin from "./component/loginregister/RegisterLogin";

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={
        (props) => (
          authenticated === true ? (
          <Component {...props} />
        // )
        ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        ))
      }
    />
  );
}
function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={
        (props) => (
          authenticated === false ? (
          <Component {...props} />
        // )
        ) : (
        <Redirect to="/home" />
        )
        )
      }
    />
  );
}
class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true,
      find: false,
      acc: [],
    };
  }
  async componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        });
      }
    });
  }
  render() {
    return (
      <div>
        {this.state.loading === true ? (
          <h2>Loading...</h2>
        ) : (
          <div className="app">
            <Router>
              <Switch>
                {/* <Route exact path="/" component={Home}></Route> */}
                <PrivateRoute
                  path="/home"
                  authenticated={this.state.authenticated}
                  component={Home}
                ></PrivateRoute>
                {/* <PublicRoute
                  path="/signup"
                  authenticated={this.state.authenticated}
                  component={Signup}
                ></PublicRoute> */}

                <PublicRoute
                  path="/edit"
                  // to='/chat'
                  authenticated={this.state.authenticated}
                  component={EditPro}
                ></PublicRoute>
                <PublicRoute
                  path="/"
                  authenticated={this.state.authenticated}
                  component={RegisterLogin}
                ></PublicRoute>
              </Switch>
            </Router>
          </div>
        )}
      </div>
    );
  }
}

export default App;
