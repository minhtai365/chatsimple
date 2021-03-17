import React, { Component, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Contentchat from "../Contentchat";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";
import Header from "./Header";
// import Setname from "./Setname";
// import { Link, withRouter } from "react-router-dom";
export default function ChatForm() {
  const history = useHistory();
  const [user, setUser] = useState(auth().currentUser);
  const [chat, setChat] = useState([]);
  const [acc, setAcc] = useState([]);
  const [writeErr, setWriteErr] = useState(null);
  const [err, setErr] = useState(null);
  const [content, setContent] = useState([]);
  //   const [scroll, setScroll] = useState(false);
  useEffect(() => {
    setErr(null);
    try {
      db.ref("chats").on("value", (snapshot) => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        setChat(chats);
        // setScroll(!scroll);

        //   {scroll && handleScroll}
        db.ref("user").on("value", (snapshot) => {
          let accs = [];
          snapshot.forEach((x) => {
            accs.push(x.val());
          });

          setAcc(accs);
        });
      });
    } catch (error) {
      setErr(error.message);
    }
  }, []);

  // useEffect(() => {

  //   history.push("/");
  // },[]);

  useEffect(() => {
    handleScroll();
  }, [chat]);
  const handleScroll = () => {
    const scroll = document.getElementById("scroll");
    scroll.scrollTop = scroll.scrollHeight;
    // window.scroll({
    //   top: document.getElementById('scroll').offsetHeight,
    //   left: 0,
    //   behavior: "smooth",
    // });
  };
  const handleChange = (event) => {
    setContent(event.target.value);
  };
  async function handleSubmit(event) {
    event.preventDefault();
    if (content === "") {
      setWriteErr("Dữ liệu rỗng");
      setErr(true);
    } else
      try {
        await db.ref("chats").push({
          content: content,
          timestamp: Date.now(),
          uid: user.uid,
        });

        setContent("");
      } catch (error) {
        setWriteErr(error.message);
      }
  }
  return (
    // <div>
    //   <Header />
    <div className="box-chat">
      <div className="box-chat__header">
        <div className="chat-header__left">
          <img
            className="chat-avt"
            src="https://pickaface.net/gallery/avatar/unr_none_161214_0941_9oav0t.png"
          />

          <div className="chat-name">
            Login in as: <strong>{user.email}</strong>
          </div>
        </div>
        <div className="chat-header__right">
          <button className=""></button>
        </div>
      </div>

      <div className="box-chat__content" id="scroll">
        {chat.map((chat) => {
          // console.log(chat);
          if (chat.uid === user.uid) {
            // console.log(chat.content);
            return (
              <div>
                <div style={{ float: "right" }}>
                  <div className="schat content-chat">{chat.content}</div>
                  <div>
                    {new Date(chat.timestamp).toLocaleTimeString("en-US")}
                  </div>
                </div>

                <div className="clear-float"></div>
              </div>
            );
          } else {
            var image = "";
            var name = "";
            let per = acc.filter((x) => x.uid === chat.uid);
            if (per.length !== 0) {
              if (acc != null) {
                name = per[0].name;
                image = per[0].image;
              }
            }
            return (
              <div style={{ color: "blue" }} key={chat.timestamp}>
                <Contentchat
                  avt={image}
                  name={name}
                  content={chat.content}
                  time={new Date(chat.timestamp).toLocaleTimeString("en-US")}
                />
              </div>
            );
          }
        })}
      </div>

      <div className="box-chat__send">
        <form onSubmit={handleSubmit}>
          <div className="form-chat">
            <input
              className="input-chat"
              onChange={handleChange}
              value={content}
            />
            {err ? (
              <p style={{ color: "red", fontSize: ".7rem" }}>{writeErr}</p>
            ) : null}
            <button className="send-chat" type="submit">
              Send
            </button>
          </div>
        </form>
      </div>
      <div></div>
    </div>
    // </div>
  );
}
