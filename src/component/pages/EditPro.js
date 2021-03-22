import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../services/firebase";

export default function EditPro(props) {
  const [user, setUser] = useState();
  const [inputCha, setInputCha] = useState({
    name:  auth().currentUser.displayName,
    image: auth().currentUser.photoURL,
  });
  const setData = () => {
    db.ref("user/" + user.uid).set({
      ...user,
      name: inputCha.name,
      image: inputCha.image,
    },(error) => {
      if (error) {
        console.log(error);
      } else {
        alert('ok');
        props.hiddenEdit();
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
        // console.log(x.val().uid);
        if (x.val().uid === auth().currentUser.uid) setUser(x.val());
      });
      // setUser(us);
    });
  }, []);
  // console.log(auth().currentUser);
  // console.log(user);
  return (
    <div className="center-content">
      <div style={{ textAlign: "right" }}>
        <button onClick={()=>props.hiddenEdit()} style={{ height: "2.3rem" }} className="btn text-light btn-login">
         <i className='fas fa-times'></i>
        </button>
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
