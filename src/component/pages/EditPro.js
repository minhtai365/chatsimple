import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../services/firebase";

export default function EditPro() {
  const [user, setUser] = useState();
  const [inputCha, setInputCha] = useState({
    name:  auth().currentUser.displayName,
    image: auth().currentUser.photoURL,
  });
  const setData = () => {
    // var item=db.ref().child('user').push().key;
    // console.log(item);
    db.ref("user/" + user.uid).set({
      ...user,
      name: inputCha.name,
      image: inputCha.image,
    },(error) => {
      if (error) {
        // The write failed...
        console.log(error);
      } else {
        // Data saved successfully!
        console.log('ok');
      }
    });
  };
  const handleChange = (event) => {
    setInputCha((sta) => {
      return {
        ...sta,
        [event.target.name]: event.target.value,
      };
    });
  };
  useEffect(() => {
    db.ref("user").on("value", (u) => {
      // let us = [];
      u.forEach((x) => {
        console.log(x.val().uid);
        if (x.val().uid === auth().currentUser.uid) setUser(x.val());
      });
      // setUser(us);
    });
  }, []);
  console.log(auth().currentUser);
  console.log(user);
  return (
    <div className="center-content">
      <div style={{ textAlign: "right" }}>
        <Link style={{ height: "2.3rem" }} className="btn text-light btn-login" to="/Chat">
          Go To Chat
        </Link>
      </div>
      <div className="form-group">
        <label for="name">Name</label>
        <input
          onChange={handleChange}
          type="text"
          className="form-control"
          name="name"
          placeholder={user ? user.name : ""}
        />
        <small id="helpId" className="form-text text-muted">
          Help text
        </small>
      </div>
      <div className="form-group">
        <label for="image">Image</label>
        <input
          onChange={handleChange}
          type="text"
          className="form-control"
          name="image"
          placeholder={user ? user.image : ""}
        />
        <img className="mt-3 " src={user ? user.image : ""} />
      </div>
      <div className=" text-center">
        <button type="submit" onClick={setData} className=" btn btn-danger">
          Submit
        </button>
      </div>
    </div>
  );
}
