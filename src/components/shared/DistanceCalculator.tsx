import { useState, useEffect } from "react";

interface DistanceCalculatorProps {
  lat1: number;
  lon1: number;
  lat2: number;
  lon2: number;
}

const OSRM_API_URL = "http://router.project-osrm.org/route/v1/driving";

const calculateDistance = async (lat1: number, lon1: number, lat2: number, lon2: number): Promise<number | null> => {
  const url = `${OSRM_API_URL}/${lon1},${lat1};${lon2},${lat2}?overview=false`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.routes && data.routes.length > 0) {
      // distance is in meters
      const distance = data.routes[0].distance;
      // Convert to kilometers
      return distance / 1000;
    }
  } catch (error) {
    console.error("Error fetching OSRM data:", error);
  }
  return null;
};

const DistanceCalculator: React.FC<DistanceCalculatorProps> = ({ lat1, lon1, lat2, lon2 }) => {
  const [distance, setDistance] = useState<number | null>(null);

  useEffect(() => {
    const fetchDistance = async () => {
      const calculatedDistance = await calculateDistance(lat1, lon1, lat2, lon2);
      setDistance(calculatedDistance);
    };

    fetchDistance();
  }, [lat1, lon1, lat2, lon2]);

  return (
    <div>
      <h3>Distance between the two points: {distance !== null ? `${distance.toFixed(2)} km` : "Calculating..."}</h3>
    </div>
  );
};

export default DistanceCalculator;
