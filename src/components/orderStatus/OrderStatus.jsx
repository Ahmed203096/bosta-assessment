import React, { useContext, useEffect, useState } from "react";
import "./orderStatus.css";
import Timeline from "../timeLine/Timeline";
import { LanguageContext } from "../../context/LanguageContext";


export default function OrderStatus({ data }) {
  const [status, setStatus] = useState(data.CurrentStatus || null);
  const { language, changeLanguage } = useContext(LanguageContext);
  useEffect(() => {
    setStatus(data.CurrentStatus);
  }, [data]);
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <div className="d-flex justify-content-center mt-3">
      <div className="status-container">
        <div className={`description ${language=="English"?"en":"ar"}`}>
          <p className="font-gray">{language=='English'?'Order':'رقم الشحنة'} #{data.TrackingNumber}</p>
          {status && (status.state == "Delivered" || status.state == " Returned") ? (
            <>
              <p className="font-black">{language == 'English'?status.state:"تم الاستلام"}</p>
              <p className="font-gray-lg">
                {formatDate(status.timestamp)}
              </p>
            </>
          ) : (
            <>
              <p className="font-black">
                {language == 'English'?"Arriving By":"سوف يصل طلبك بحلول"}
                <span className="font-blue">
                  {formatDate(data.ScheduleDate)}
                </span>
              </p>
              <p className="font-gray-lg">
                {language == 'English'?"Your Order is expected to arrive within 2-3 working days":"من المتوقع أن يصل طلبك خلال 2-3 أيام عمل"}
              </p>
            </>
          )}
        </div>
        <Timeline status={status}></Timeline>
        <div className="d-flex justify-content-center"></div>
      </div>
    </div>
  );
}
