import React, { useContext, useState } from "react";
import "./landing.css";
import pin from "../../images/Pin.png";
import logo_ar from "../../images/logo-arabic.png";
import logo_en from "../../images/logo-en.png";
import search_icon from "../../images/search-icon.png";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
// import { LanguageContext } from '../../context/languageContext';
import { LanguageContext } from "../../context/LanguageContext";


export default function Landing({ onTrackingData }) {
  const { language, changeLanguage } = useContext(LanguageContext);
  const [trackingNo, setTrackingNo] = useState("");
  const [animate,setAnimate]=useState(false);

  const fetchData = async () => {
    if (!trackingNo) {
      alert("Please enter a tracking number.");
      return;
    }
    try {
      const URL = `https://tracking.bosta.co/shipments/track/${trackingNo}`;
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "x-requested-by": "Bosta",
        },
      });

      if (!response.ok) {
        onTrackingData(null);
        throw new Error("Failed to fetch data");
      }
      setAnimate(true);
      setTimeout(()=>{
        setAnimate(false);
      },2000);

      const result = await response.json();
      console.log("Fetched Data:", result);

      onTrackingData({result});
    } catch (error) {
      onTrackingData(null);
      console.error("Error fetching data:", error);
    }
  };

  function togleLanguage(e) {
    if (e.target.value === "English") {
      document.getElementById("nav").style.direction = "ltr";
      changeLanguage("English");
    } else {
      document.getElementById("nav").style.direction = "rtl";
      changeLanguage("Arabic");
    }
  }

  return (
    <div className="landing-container d-flex flex-column justify-content-end">
      <div className="rectangle"></div>
      <div className="landing-items-container pt-5 h-100 d-flex flex-column align-items-center justify-content-between">
        <div
          id="nav"
          className="w-100 d-flex justify-content-around align-items-start"
        >
          <select onChange={togleLanguage} id="language-dropDown">
            <option value="English">English</option>
            <option value="Arabic">عربي</option>
          </select>
          <img src={language === "Arabic" ? logo_ar : logo_en} alt="logo" />
        </div>

        <div className="landing-content d-flex flex-column align-items-center">
          <img className={animate?"animate":""} src={pin} width="224.4px" alt="Pin" />
          <p className="landing-title">{language == 'English'?"Track Your Order":"تتبع شحنتك"}</p>
          <InputGroup size="lg">
            <InputGroup.Text onClick={fetchData} className="search">
              <img src={search_icon} alt="search" />
            </InputGroup.Text>
            <Form.Control
              value={trackingNo}
              onChange={(e) => setTrackingNo(e.target.value)}
              placeholder="Enter Tracking Number"
              style={{ direction: "rtl" }}
            />
          </InputGroup>
        </div>
      </div>
    </div>
  );
}
