import { createContext, useContext, useEffect, useState } from "react";

export const DataContext = createContext();

function ContextApi({ children }) {
  const [userHai, setUser] = useState(null);
  const userIdd = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/userInfo/${userIdd}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userIdd) {
      fetchUserData();
    }
  }, [userIdd]);

  return (
    <DataContext.Provider value={{ userHai }}>
      {children}
    </DataContext.Provider>
  );
}

export default ContextApi;
