import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../services/firebase";

export default function EditPro(props) {
  return (
    <div className="center-content">
      <div style={{ textAlign: "right" }}>
        <button onClick={()=>props.hiddenMusic()} style={{ height: "2.3rem" }} className="btn text-light btn-login">
         <i className='fas fa-times'></i>
        </button>
      </div>
      <div className="form-group">
        <label for="name">Name</label>
      
      </div>
    </div>
  );
}
