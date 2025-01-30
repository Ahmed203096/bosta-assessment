import React, { Suspense, useState } from "react";
import Landing from "../components/landing/Landing";
import OrderStatus from "../components/orderStatus/OrderStatus";
import InvalidNo from "../components/invalidNO/InvalidNo";
import downArrow from "../images/down-arrow.png"
const LazyLoadedComponent = React.lazy(() =>
  import("../components/trackingDetails/TrackingDetails")
);

export default function TrackingPage() {
  const [trackingData, setTrackingData] = useState(null);
  const [flag, setFlag] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleClick = () => {
    setIsLoaded(true);
  };

  const handleTrackingData = (data) => {
    setFlag(true);
    if (data) {
      setTrackingData(data.result);
    } else {
      setTrackingData(null);
    }
  };
  return (
    <>
      <Landing onTrackingData={handleTrackingData}></Landing>
      {trackingData && !trackingData["error"] ? (
        <>
          <OrderStatus data={trackingData}></OrderStatus>
          {trackingData.TransitEvents && !isLoaded&& (
            <div className="d-flex justify-content-center mt-3">
            <button className="btn-more m-auto " onClick={handleClick}>More <img src={downArrow}></img></button>
            </div>
          )}
          <Suspense fallback={<div className="loader"></div>}>
            {isLoaded && <LazyLoadedComponent data={trackingData} />}
          </Suspense>
        </>
      ) : (
        flag && <InvalidNo></InvalidNo>
      )}
    </>
  );
}
