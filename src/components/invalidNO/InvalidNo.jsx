import React, { useContext } from "react";
import "./invalidNo.css";
import { LanguageContext } from "../../context/LanguageContext";

export default function InvalidNo({ lang }) {
  const { language, changeLanguage } = useContext(LanguageContext);

  return (
    <div className="d-flex flex-column align-items-center gap-3 my-5 py-5">
      <h1 className="heading">{language == "English" ? "NOT FOUND" : "لم يتم العثور على شحنتك"}</h1>
      <h3 className="c-text">
        {language == "English"
          ? "Looks like you enterd an invalid tracking number"
          : "يبدو ان رقم التتبع غير صحيح"}
      </h3>
      <h3 className="c-text">
        {language == "English" ? "Please try valid tracking number" : "برجاء إدخال رقم تتبع صحيح والمحاولة مره اخري"}
      </h3>
    </div>
  );
}
