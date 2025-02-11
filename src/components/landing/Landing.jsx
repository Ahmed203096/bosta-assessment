import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./landing.css";
import pin from "../../images/Pin.png";
import logo_ar from "../../images/logo-arabic.png";
import logo_en from "../../images/logo-en.png";
import search_icon from "../../images/search-icon.png";
import search_icon_black from "../../images/IconWrapper.png";
import moon from "../../images/moon.png";
import sun from "../../images/sun.png";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { LanguageContext } from "../../context/LanguageContext";
import { TrackingCacheContext } from "../../context/TrackingCacheContext";

export default function Landing({ onTrackingData }) {
  const { language, changeLanguage } = useContext(LanguageContext);
  const { cache, updateCache } = useContext(TrackingCacheContext);
  const [trackingNo, setTrackingNo] = useState("");
  const [animate, setAnimate] = useState(false);
  const [height, setHeight] = useState(0);
  const [darkmode, setDarkMode] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchData = async () => {
    setHeight(0);

    if (!trackingNo) {
      alert("Please enter a tracking number.");
      return;
    }
    if (/[a-zA-Z]/.test(trackingNo)) {
      alert("Please enter a valid tracking number.");
      return;
    }
    setAnimate(true);
    setTimeout(() => setAnimate(false), 2000);
    if (cache[trackingNo]) {
      onTrackingData({ result: cache[trackingNo] });
      return;
    }
    try {
      const URL = `https://tracking.bosta.co/shipments/track/${trackingNo}`;
      const response = await axios.get(URL, {
        headers: { "x-requested-by": "Bosta" },
      });

      updateCache(trackingNo, response.data);
      onTrackingData({ result: response.data });
    } catch (error) {
      onTrackingData(null);
    }
  };

  function toggleLanguage(e) {
    if (e.target.value === "English") {
      document.getElementById("nav").style.direction = "ltr";
      changeLanguage("English");
    } else {
      document.getElementById("nav").style.direction = "rtl";
      changeLanguage("Arabic");
    }
  }

  const toggleHeight = () => {
    if (screenWidth <= 600) setHeight(height === 100 ? 0 : 100);
  };
  const toggleDarkMode = () => {
    if (darkmode) {
      document.documentElement.style.setProperty("--body-color", "white");
      document.documentElement.style.setProperty("--primary-color", "black");
      document.documentElement.style.setProperty("--secondary-color","#667085");
      document.documentElement.style.setProperty("--land-color", "#f3fafb");
    } else {
      document.documentElement.style.setProperty("--body-color", "#2b2b2b");
      document.documentElement.style.setProperty("--primary-color", "white");
      document.documentElement.style.setProperty("--secondary-color", "#ddd");
      document.documentElement.style.setProperty("--land-color", "#393a3b");
    }
    setDarkMode(darkmode === true ? false : true);
  };

  return (
    <div className="landing-container d-flex flex-column justify-content-end">
      <div className="rectangle"></div>
      <div className="landing-items-container pt-5 h-100 d-flex flex-column align-items-center justify-content-between">
        <div
          id="nav"
          className="w-100 d-flex justify-content-around align-items-start"
        >
          <div>
            <select onChange={toggleLanguage} id="language-dropDown">
              <option value="English">English</option>
              <option value="Arabic">عربي</option>
            </select>
            {screenWidth <= 600 && (
              <img
                onClick={toggleHeight}
                src={search_icon_black}
                alt="search-icon_black"
                className="search-icon "
              />
            )}
            <img
              className="mx-3"
              width="30px"
              src={darkmode ? sun : moon}
              alt="dark-mood-icon"
              onClick={toggleDarkMode}
            />
          </div>
          <img src={language === "Arabic" ? logo_ar : logo_en} alt="moon" />
        </div>

        <div className="landing-content d-flex flex-column align-items-center">
          <img
            className={animate ? "animate" : ""}
            src={pin}
            width="224.4px"
            alt="Pin"
          />
          <p className="landing-title">
            {language == "English" ? "Track Your Order" : "تتبع شحنتك"}
          </p>
          <div
            style={{
              maxHeight: screenWidth <= 600 ? `${height}px` : "auto",
              transition:
                "max-height 0.5s ease-in-out, padding 0.5s ease-in-out, opacity 0.3s",
              visibility:
                screenWidth <= 600 && height == 0 ? "hidden" : "visible",
            }}
            className="search-container"
          >
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
    </div>
  );
}