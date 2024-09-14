export const fetchAddress = async (lat: number, lon: number) => {
  const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
  const data = await response.json();
  return data?.address;
};
