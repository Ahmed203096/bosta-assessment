import React, { useEffect, useState } from "react";
import "./trackingDetails.css";

export default function TrackingDetails({ data }) {
  const [details, setDetails] = useState(data.TransitEvents?prepareDate(data.TransitEvents):null);
  useEffect(() => {
    setDetails(data.TransitEvents?prepareDate(data.TransitEvents):null);
  }, [data]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  function prepareDate(data) {
    let mapedArr = [
      [
        {
          date: data[0].timestamp.split("T")[0],
          time: data[0].timestamp.split("T")[1].split(".")[0],
          msg: data[0].msg || data[0].state,
        },
      ],
    ];
    let index = 0;
    for (let i = 1; i < data.length; i++) {
      if (mapedArr[index][0]["date"] == data[i].timestamp.split("T")[0]) {
        mapedArr[index].push({
          date: data[i].timestamp.split("T")[0],
          time: data[i].timestamp.split("T")[1].split(".")[0],
          msg: data[i].msg || data[i].state,
        });
      } else {
        index++;
        mapedArr[index] = [
          {
            date: data[i].timestamp.split("T")[0],
            time: data[i].timestamp.split("T")[1].split(".")[0],
            msg: data[i].msg || data[i].state,
          },
        ];
      }
    }
    return mapedArr;
  }

  function convertTo12HourFormat(timeString) {
    const [hours, minutes] = timeString.split(":");
    let hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12; 
    hour = hour ? hour : 12;
  
    return `${hour}:${minutes} ${ampm}`;
  }
  return (
    details &&
    details.length > 0 && (
      <div className="d-flex justify-content-center py-5">
        <div className="tracking-container">
          <p className="title">Tracking Details</p>

          {details.map((ele) => (
            <div className="details-container">
              <div className="title-details">
                <div className="circle"></div>
                <div className="title-details-text">{ele[0].date}</div>
              </div>
              {ele.map((message)=>(
                <div className="list">
                <div className="card-details my-1">
                  <div className="my-1">{message.msg}</div>
                  <div className="text-gray my-1">{convertTo12HourFormat(message.time)}</div>
                </div>
              </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  );
}
