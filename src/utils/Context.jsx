import { createContext, useState, useEffect } from "react";
import { getServices } from "./api";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const value = { services, loading };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};