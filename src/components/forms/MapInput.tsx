"use client";
// components/Map.tsx
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import { useGeolocation } from "@/providers/GeoLocationProvider";
import { Skeleton } from "../ui/skeleton";

interface MapInputProps {
  value: [number, number];
  onChange: (position: [number, number]) => void;
}
const MapInput = ({ onChange, value }: MapInputProps) => {
  const [position, setPosition] = useState<[number, number] | null>(value ?? null);
  // Icon for the marker
  const markerIcon = new L.Icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41],
  });

  // Function to handle map click events
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const newPosition: [number, number] = [e.latlng.lat, e.latlng.lng];

        setPosition(newPosition);
        onChange(newPosition);
      },
    });

    return position === null ? null : <Marker position={position} icon={markerIcon}></Marker>;
  };

  useEffect(() => {
    console.log("Position => ", position);
  }, [position]);

  return (
    <>
      {location ? (
        <MapContainer
          center={[value[0] || 28.3949, value[1] || 84.124]} // Default center
          zoom={13}
          style={{ height: "320px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker />
        </MapContainer>
      ) : (
        <Skeleton className="w-full h-80" />
      )}

      {JSON.stringify(position)}
    </>
  );
};

export default MapInput;
