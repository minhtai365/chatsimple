import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router";
import { Link } from "react-router-dom";
import { auth, db } from "../services/firebase";

export default function Header() {
  const history = useHistory();
  const [val, setVal] = useState('');
  async function logOut() {
    await auth().signOut();
    history.push("/");
  }
  useEffect(async () => {
    // console.log(dtb(auth().currentUser.uid));
    
    await db.ref("user/" + auth().currentUser.uid)
      .get()
      .then((dt) => {
        setVal(dt.val());
      });
  }, []);
  return (
    <header className="my-header">
      <Link to="/edit" className=" bbn btn-info">
        {val.name}
      </Link>
      <button onClick={() => logOut()} className=" btn-danger">
        Logout
      </button>
    </header>
  );
}
