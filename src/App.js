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

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={
        (props) => (
          // authenticated === true ? (
          <Component {...props} />
        )
        // ) : (
        // <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        // ):null
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
          // authenticated === false ? (
          <Component {...props} />
        )
        // ) : (
        // <Redirect to="/chat" />
        // )
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
    await db.ref("user").on("value", (snapshot) => {
      var acc = [];
      snapshot.forEach((x) => {
        acc.push(x.val());
      });
      if (acc.filter((x) => x.uid === auth().currentUser.uid).length > 0) {
      } else {
        // console.log(auth().currentUser.displayName);
       db.ref("user/" + auth().currentUser.uid).set({
          uid: auth().currentUser.uid,
          email: auth().currentUser.email,
          timestamp: Date.now(),
          image: auth().currentUser.photoURL,
          name: auth().currentUser.displayName,
        });
        // db.ref("user").push({
        //   uid: auth().currentUser.uid,
        //   email: auth().currentUser.email,
        //   timestamp: Date.now(),
        //   image: auth().currentUser.photoURL,
        //   name: auth().currentUser.displayName,
        // });
      }
    });
  }
  render() {
    // console.log(auth().currentUser.uid);
    // var dt =db.ref('user/'+auth().currentUser.uid).get().then(dt=>{
    //   console.log(dt.val());
    // })
    // console.log(db.ref('user/'+auth().currentUser.uid).get());
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
                  path="/chat"
                  authenticated={this.state.authenticated}
                  component={Home}
                ></PrivateRoute>
                <PublicRoute
                  path="/signup"
                  authenticated={this.state.authenticated}
                  component={Signup}
                ></PublicRoute>

                <PublicRoute
                  path="/edit"
                  // to='/chat'
                  authenticated={this.state.authenticated}
                  component={EditPro}
                ></PublicRoute>
                <PublicRoute
                  path="/"
                  authenticated={this.state.authenticated}
                  component={Register}
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
