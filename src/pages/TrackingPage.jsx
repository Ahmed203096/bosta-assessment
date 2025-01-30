import React, { Suspense, useRef, useState } from "react";
import Landing from "../components/landing/Landing";
import OrderStatus from "../components/orderStatus/OrderStatus";
import InvalidNo from "../components/invalidNO/InvalidNo";
import downArrow from "../images/down-arrow.png"
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
const LazyLoadedComponent = React.lazy(() =>
  import("../components/trackingDetails/TrackingDetails")
);

export default function TrackingPage() {
  const [trackingData, setTrackingData] = useState(null);
  const [flag, setFlag] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const exportRef = useRef();
  const exportPDF = async () => {
    const content = exportRef.current;
    const canvas = await html2canvas(content);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("document.pdf");
  };

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
        <div ref={exportRef}>
          <OrderStatus data={trackingData}></OrderStatus>
          {trackingData.TransitEvents && !isLoaded&& (
            <div className="d-flex justify-content-center mt-3">
            <button className="btn-more m-auto " onClick={handleClick}>More <img src={downArrow}></img></button>
            </div>
          )}
          <Suspense fallback={<div className="loader"></div>}>
            {isLoaded && <LazyLoadedComponent data={trackingData} />}
          </Suspense>
        </div>
        <button className="export-btn btn btn-outline-danger sticky-bottom" onClick={exportPDF}>Export</button>
        </>
      ) : (
        flag && <InvalidNo></InvalidNo>
      )}
    </>
  );
}
