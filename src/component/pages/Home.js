import React, { useEffect, useState } from "react";
import AddPost from "../include/AddPost";
import FrentList from "../include/FrentList";
import MainPost from "../include/MainPost";
import { auth, db } from "../services/firebase";
import ChatForm from "./ChatForm";
import Header from "./Header";

export default function Home() {
  const [add, setAdd] = useState(false);
  const [chatFrent, setChatFrent] = useState(null);
  useEffect(async () => {
    await db.ref("user").on(
      "value",
      (snapshot) => {
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
      },
      []
    );
  });

  function getToChat(chatTo) {
    setChatFrent(chatTo);
    // console.log(chatTo);
  }
  function setOfChat(){
    setChatFrent(null)
  }
  // console.log(chatFrent);
  return (
    <div>
      <div className="heade">
        <Header />
      </div>
      <div className="frentlist">
        <FrentList getChat={(chatTo) => getToChat(chatTo)} />
      </div>
      <div
        style={{ width: "25%", marginTop: "-2rem" }}
        className="text-center ml-3 position-fixed addpost"
      >
        <button onClick={() => setAdd(!add)} className="btn-add">
          {add ? (
            <i className="fas fa-times"></i>
          ) : (
            <i className="fas fa-plus"></i>
          )}
        </button>

        {add && <AddPost />}
      </div>
      <div className="mainpost"> 
        <MainPost />
      </div>
      
      <div className="chatform">{chatFrent && <ChatForm ofChat={()=>setOfChat()} chatTo={chatFrent} />}</div>
    </div>
  );
}
