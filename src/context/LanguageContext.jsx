// export const LanguageProvider = ({ children }) => {
//   const [language, setLanguage] = useState('English'); 

//   const changeLanguage = (newLanguage) => {
//     setLanguage(newLanguage);
//   };

//   return (
//     <LanguageContext.Provider value={{ language, changeLanguage }}>
//       {children}
//     </LanguageContext.Provider>
//   );
// };

import { createContext, useContext, useState } from "react";

// ✅ Create the Language Context
export const LanguageContext = createContext();

// ✅ Create a Provider Component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("English"); 

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// ✅ Custom Hook for Easier Access
export const useLanguage = () => {
  return useContext(LanguageContext);
};
