import React from "react";

export default function Contentchat(props) {
  // console.log(props.name);
  // console.log(props.avt);
  return (
    <div style={{ display: "flex" }}>
      <div className="avt-chat">
        <img className="avt-chat" src={props.avt||'https://pickaface.net/gallery/avatar/unr_none_161214_0941_9oav0t.png'} />
      </div>
      <p className="content-chat rchat" title={props.time}>{props.content}</p>
      {/* <mark></mark> */}
    </div>
  );
}
