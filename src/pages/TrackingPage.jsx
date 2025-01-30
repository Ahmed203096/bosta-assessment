import React, { useState } from "react";
import Landing from "../components/landing/Landing";
import TrackingDetails from "../components/trackingDetails/TrackingDetails";
import OrderStatus from "../components/orderStatus/OrderStatus";
import InvalidNo from "../components/invalidNO/InvalidNo";

export default function TrackingPage() {
  const [trackingData, setTrackingData] = useState(null);
  const [flag,setFlag] = useState(false);
  console.log("tracking data from parent => ", trackingData);

  const handleTrackingData = (data) => {
    setFlag(true);
    if(data){ 
      setTrackingData(data.result);
    }else{
      setTrackingData(null);
    }
  };
  return (
    <>
      <Landing onTrackingData={handleTrackingData}></Landing>
      {trackingData && !trackingData["error"] ? (
        <>
          <OrderStatus data={trackingData}></OrderStatus>
          <TrackingDetails data={trackingData}></TrackingDetails>
        </>
      ) : (flag &&
        <InvalidNo></InvalidNo>
      )}
    </>
  );
}
