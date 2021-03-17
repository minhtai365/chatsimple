import "./frentlist.css";
import React, { useEffect, useState } from "react";
import { db } from "../services/firebase";

export default function FrentList(props) {
  const [user, setUser] = useState([]);
  // us
  useEffect(async () => {
    await db.ref("user").on("value", (snapshot) => {
      var acc = [];
      snapshot.forEach((x) => {
        acc.push(x.val());
      });
      setUser(acc);
    });
  }, []);

  return (
      
    <div className="container-frent">
      {user.map((x) => {
        return (
          <div className="box-frent">
            <img
              className="frent-avt"
              src={
                x.image ||
                "https://pickaface.net/gallery/avatar/unr_none_161214_0941_9oav0t.png"
              }
            />
            <div className="frent-name">{x.name}</div>
          </div>
        );
      })}
    </div>
  );
}
