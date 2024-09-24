"use client";
// components/PharmacyMap.tsx
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import { Skeleton } from "../ui/skeleton";
import { fetchPharmacies } from "@/actions/getPharmaciesForMap";
import { Pharmacy, PharmacyLocation } from "@prisma/client";
import { useGeolocation } from "@/providers/GeoLocationProvider";
import { StarInput } from "../ui/rating";
import { useTheme } from "next-themes";
import { DashboardHeading } from "../sections/dashboard/DashboardHeading";

interface PharmacyMapProps {
  loading?: boolean;
}

const PharmacyMap: React.FC<PharmacyMapProps> = ({ loading = false }) => {
  const { location } = useGeolocation();
  const [pharmacies, setPharmacies] = useState<(Pharmacy & { location: PharmacyLocation })[]>([]);
  const MIN_ZOOM_LEVEL = 12; // Set your minimum zoom level here

  // Custom marker icon
  const markerIcon = new L.Icon({
    iconUrl: "/icons/pharmacy-building.png",
    iconSize: [42, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41],
  });

  const LocationMarker = () => {
    const map = useMap();

    useMapEvents({
      moveend: async () => {
        if (map.getZoom() < MIN_ZOOM_LEVEL) return; // Prevent fetching if zoom level is too low
        const bounds = map.getBounds();
        const boundsObject = {
          southwest: [bounds.getSouthWest().lat, bounds.getSouthWest().lng] as L.LatLngTuple,
          northeast: [bounds.getNorthEast().lat, bounds.getNorthEast().lng] as L.LatLngTuple,
        };
        const pharmacies = await fetchPharmacies(boundsObject);
        setPharmacies(pharmacies);
      },
      zoomend: async () => {
        if (map.getZoom() < MIN_ZOOM_LEVEL) return; // Prevent fetching if zoom level is too low
        const bounds = map.getBounds();
        const boundsObject = {
          southwest: [bounds.getSouthWest().lat, bounds.getSouthWest().lng] as L.LatLngTuple,
          northeast: [bounds.getNorthEast().lat, bounds.getNorthEast().lng] as L.LatLngTuple,
        };
        const pharmacies = await fetchPharmacies(boundsObject);
        setPharmacies(pharmacies);
      },
    });

    return null;
  };

  useEffect(() => {
    const initialFetch = async () => {
      const boundsObject = location
        ? {
            southwest: [location.latitude, location.longitude] as L.LatLngTuple,
            northeast: [location.latitude, location.longitude] as L.LatLngTuple,
          }
        : {
            southwest: [28.3949, 84.124] as L.LatLngTuple, // Default southwest corner
            northeast: [28.3949, 84.124] as L.LatLngTuple, // Default northeast corner
          };

      const initialPharmacies = await fetchPharmacies(boundsObject);
      setPharmacies(initialPharmacies);
    };

    initialFetch();
  }, [location]);

  const defaultCenter: L.LatLngTuple = location ? [location.latitude, location.longitude] : [28.3949, 84.124];

  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  return (
    <>
      <DashboardHeading heading="Explore Pharmacies On Map" text="All of our partner andd verified pharmacies are shown below in map" />
      {loading ? (
        <Skeleton className="w-full h-80" />
      ) : (
        <MapContainer center={defaultCenter} className="z-40" zoom={13} style={{ height: "320px", width: "100%" }}>
          <TileLayer
            url={isDarkMode ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker />
          {pharmacies.map((pharmacy, index) => (
            <Marker key={index} position={[pharmacy.location.latitude, pharmacy.location.longitude]} icon={markerIcon}>
              <Popup>
                <strong>{pharmacy.name}</strong>
                <StarInput variant="yellow" rating={pharmacy.averageRating} disabled />
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </>
  );
};

export default PharmacyMap;
