import React, { createContext, useState } from "react";

export const TrackingCacheContext = createContext();

export const TrackingCacheProvider = ({ children }) => {
  const [cache, setCache] = useState({});

  const updateCache = (trackingNo, data) => {
    setCache((prevCache) => ({
      ...prevCache,
      [trackingNo]: data,
    }));
  };

  return (
    <TrackingCacheContext.Provider value={{ cache, updateCache }}>
      {children}
    </TrackingCacheContext.Provider>
  );
};
