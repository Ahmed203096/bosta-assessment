import React, { useContext, useEffect, useState } from "react";
import "./timeline.css";
import { LanguageContext } from "../../context/LanguageContext";


export default function Timeline({ status }) {
  const prop = status || {state:null,timestamp:null};
  const [state, setState] = useState(prop.state || null);
  const { language, changeLanguage } = useContext(LanguageContext);

  let flag = [1, 0, 0, 0];
  useEffect(() => {
    setState(prop.state);
  }, [status]);
  let timestamp = [prop["timestamp"], null, null, null];
  if (state == "Delivered") {
    flag = [1, 1, 1, 1];
    timestamp = [null, null, null, status["timestamp"]];
  } else if (state == "Out for delivery") {
    flag = [1, 1, 1, 0];
    timestamp = [null, null, status["timestamp"], null, null];
  } else if (state == "Processing") {
    flag = [1, 1, 0, 0];
    timestamp = [null, status["timestamp"], null, null, null];
  }
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  }
  return (
    <div>
      <div className={"container1"}>
        <div className="container3 active">
          <span className="progress-circle">
            <svg
              width="12px"
              height="12px"
              viewBox="0 0 36 36"
              className="check"
            >
              <path
                fill="#fff"
                d="M34.459 1.375a2.999 2.999 0 0 0-4.149.884L13.5 28.17l-8.198-7.58a2.999 2.999 0 1 0-4.073 4.405l10.764 9.952s.309.266.452.359a2.999 2.999 0 0 0 4.15-.884L35.343 5.524a2.999 2.999 0 0 0-.884-4.149z"
              ></path>
            </svg>
          </span>
          <span className="title-text">{language == 'English'?"Picked Up":"تم استلام الطلب"}</span>
          {timestamp[0] && <span className="title-text">{formatDate(timestamp[0])}</span>}
        </div>
        <div className={`container3 ${flag[1] ? "active" : "inactive"}`}>
          <span className="progress-circle">
            <svg
              width="12px"
              height="12px"
              viewBox="0 0 36 36"
              className="check"
            >
              <path
                fill="#fff"
                d="M34.459 1.375a2.999 2.999 0 0 0-4.149.884L13.5 28.17l-8.198-7.58a2.999 2.999 0 1 0-4.073 4.405l10.764 9.952s.309.266.452.359a2.999 2.999 0 0 0 4.15-.884L35.343 5.524a2.999 2.999 0 0 0-.884-4.149z"
              ></path>
            </svg>
          </span>
          <span className="title-text">{language == 'English'?"Processing":"تجهيز"}</span>
          {timestamp[1] && <span className="title-text">{formatDate(timestamp[1])}</span>}
        </div>
        <div className={`container3 ${flag[2] ? "active" : "inactive"}`}>
          <span className="progress-circle">
            <svg
              width="12px"
              height="12px"
              viewBox="0 0 36 36"
              className="check"
            >
              <path
                fill="#fff"
                d="M34.459 1.375a2.999 2.999 0 0 0-4.149.884L13.5 28.17l-8.198-7.58a2.999 2.999 0 1 0-4.073 4.405l10.764 9.952s.309.266.452.359a2.999 2.999 0 0 0 4.15-.884L35.343 5.524a2.999 2.999 0 0 0-.884-4.149z"
              ></path>
            </svg>
          </span>
          <span className="title-text">{language == 'English'?"Out for Delivery":"خارج للتوصيل"}</span>
          {timestamp[2] && <span className="title-text">{formatDate(timestamp[2])}</span>}
        </div>
        <div className={`container3last ${flag[3] ? "active" : "inactive"}`}>
          <span className="progress-circle">
            <svg
              width="12px"
              height="12px"
              viewBox="0 0 36 36"
              className="check"
            >
              <path
                fill="#fff"
                d="M34.459 1.375a2.999 2.999 0 0 0-4.149.884L13.5 28.17l-8.198-7.58a2.999 2.999 0 1 0-4.073 4.405l10.764 9.952s.309.266.452.359a2.999 2.999 0 0 0 4.15-.884L35.343 5.524a2.999 2.999 0 0 0-.884-4.149z"
              ></path>
            </svg>
          </span>
          <span className="title-text">{language == 'English'?"Delivered":"تم التوصيل"}</span>
          {timestamp[3] && <span className="title-text">{formatDate(timestamp[3])}</span>}
        </div>
      </div>
    </div>
  );
}
