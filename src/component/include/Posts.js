import "./post.css";
import React, { useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
// import dtb from "../helpers/db";
export default function Posts() {
  const [post, setPost] = useState([]);
  const [user, setUser] = useState([]);
  useEffect(() => {
    db.ref("posts").on("value", (p) => {
      let po = [];
      p.forEach((x) => {
        po.push(x.val());
      });
      setPost(po.sort((a,b)=>b.timestamp-a.timestamp));
    });
  }, []);
  useEffect( async () => {
   await db.ref("user").on("value", (u) => {
      let us = [];
      u.forEach((x) => {
        us.push(x.val());
      });
      setUser(us);
    });
  }, []);
  // useEffect(() => {
  //   // console.log(dtb(auth().currentUser.uid));
  //   await db
  //     .ref("user/" + auth().currentUser.uid)
  //     .get()
  //     .then((dt) => {
  //       return dt.val();
  //     });
  // }, []);
  // console.log(post);
  return (
    <div>
      {post.map((x) => {
        var isMe={
          name:'',
          image:''
        }
        let u=user.filter(y=>y.uid===x.uid);
        if(u.length!==0){
          isMe.name=u[0].name;
          isMe.image=u[0].image;
        }
        return (
          <div className="box-post card">
            <div className="box-post__header">
              <img src={isMe.image||'https://pickaface.net/gallery/avatar/unr_none_161214_0941_9oav0t.png'} className="header-post__avt"/>
              <div className="header-post__title">
                <div className="post-name">{isMe.name}</div>
                <div className="post-time">
                  {new Date(x.timestamp).toLocaleTimeString("en-US")}
                </div>
              </div>
            </div>
            <div className="box-content">{x.post}</div>
          </div>
        );
      })}
    </div>
  );
}
