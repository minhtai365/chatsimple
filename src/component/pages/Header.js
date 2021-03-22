import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router";
import { Link } from "react-router-dom";
import { auth, db } from "../services/firebase";

export default function Header(props) {
  const history = useHistory();
  const [val, setVal] = useState("");
  async function logOut() {
    await auth().signOut();
  }
  useEffect(async () => {

    await db
      .ref("user/" + auth().currentUser.uid)
      .get()
      .then((dt) => {
        setVal(dt.val());
      });
  }, []);
  return (
    <header className="my-header">
      <div onClick={()=>props.showMusic()} className="my-logo btn text-primary">FUN CHAT</div>

      <div className="my-logo">
       <button onClick={()=>props.showEdit()} className=" bbn btn-info"> {val.name}</button>
         
        {/* </button> */}
        <button onClick={() => logOut()} className=" bbn btn-danger">
          Logout
        </button>
      </div>
    </header>
  );
}
