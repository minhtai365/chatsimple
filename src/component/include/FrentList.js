import "./frentlist.css";
import React, { useEffect, useState } from "react";
import { db } from "../services/firebase";

import Slider from "react-slick";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
export default function FrentList(props) {
  const [user, setUser] = useState([]);
  // const [toChat, setToChat] = useState('')
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
  const sendToChat = (tochat) => {
    props.getChat(tochat);
  };
  const settings = {
    dots: true,
    infinite: true,
    // adaptiveHeight:true,
    className: "slick-st",
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    // pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1180,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      }
    ],
  };

  return (
    // <div className="container-frent">
    <Slider {...settings}>
      {user.map((x) => {
        return (
          <div onClick={() => sendToChat(x)} className="box-frent">
            <div className="frent-avt">
              <img
                src={
                  x.image ||
                  "https://pickaface.net/gallery/avatar/unr_none_161214_0941_9oav0t.png"
                }
              />
            </div>
            <div className="frent-name">{x.name}</div>
          </div>
        );
      })}
    </Slider>
    // </div>
  );
}
