import { useState, useEffect } from "react";

const useIsMounted = (): boolean => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    return () => setIsMounted(false); // Cleanup if the component unmounts
  }, []);

  return isMounted;
};

export default useIsMounted;
