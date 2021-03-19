import "./addpost.css";
import React, { useEffect, useState } from "react";
import { auth, db } from "../services/firebase";

export default function AddPost() {
  const [news, setnews] = useState("");
  const [val, setVal] = useState("");
  function handelChange(event) {
    // console.log(event.target.value);
    setnews(event.target.value);
  }
  async function handleUp() {
    // db.ref("posts/" + auth().currentUser.uid).set({
    //   uid: auth().currentUser.uid,
    //   post: news,
    //   timestamp: Date.now(),
    // });
    try {
      await db.ref("posts").push({
        uid: auth().currentUser.uid,
        post: news,
        timestamp: Date.now(),
      });
      
    } catch (error) {}
    
  }
  useEffect(() => {
    // console.log(dtb(auth().currentUser.uid));
    db.ref("user/" + auth().currentUser.uid)
      .get()
      .then((dt) => {
        setVal(dt.val());
      });
  }, []);
  return (
    <div className="add-box">
      <div className="add-box__header">
        <h3>Add post</h3>
      </div>
      <div className="add-box__title">
        <img
          className="add-avt"
          src={
            val.image ||
            "https://pickaface.net/gallery/avatar/unr_none_161214_0941_9oav0t.png"
          }
        />
        <div className="add-name">{val.name}</div>
      </div>
      <form style={{width:'100%',padding :'0'}}>
        <textarea
          className="area-input"
          name="news"
          onChange={handelChange}
          placeholder="Bạn đang nghĩ gì ?"
        ></textarea>
        <div className="add-box-btn">
          <button
            type="reset"
            onClick={handleUp}
            className="add-btn btn btn-primary"
          >
            Đăng
          </button>
        </div>
      </form>
    </div>
  );
}
