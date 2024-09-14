"use client";

import FullScreenError from "@/components/shared/FullScreenError";
import { GeolocationContextValue, Location } from "@/types";
import { CodeSandboxLogoIcon } from "@radix-ui/react-icons";
import React, { createContext, FC, useContext, useEffect, useState } from "react";

const GeolocationContext = createContext<GeolocationContextValue>({
  location: null,
  error: null,
});

const GeoLocationProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    const success = (position: GeolocationPosition) => {
      const accuracy = position.coords.accuracy;

      // Assume 1000 meters is the worst acceptable accuracy for 0% accuracy
      const maxAccuracy = 1000;
      const accuracyPercentage = Math.max(0, Math.min(100, (1 - accuracy / maxAccuracy) * 100));

      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: accuracyPercentage,
      });
      console.log("=>", position.coords);
    };

    const handleError = (err: GeolocationPositionError) => {
      console.log("ERROR => ", JSON.stringify(err, null, 0));
      setError(err.message);
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 30000, // Increased timeout
      maximumAge: 0, // Allow up to 60 seconds old cached position
    };

    // const watcher = navigator.geolocation.getCurrentPosition(success, handleError, options);
    navigator.geolocation.getCurrentPosition(success, handleError, options);

    // return () => navigator.geolocation.clearWatch(watcher);
  }, []);

  return (
    <GeolocationContext.Provider value={{ location, error }}>
      {error ? <FullScreenError description={error} title="Geolocation Error!!" /> : children}
    </GeolocationContext.Provider>
  );
};

export default GeoLocationProvider;

export const useGeolocation = (): GeolocationContextValue => {
  const context = useContext(GeolocationContext);
  if (!context) {
    throw new Error("useGeolocation must be used within a GeolocationProvider");
  }
  return context;
};
