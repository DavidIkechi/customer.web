import React, { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const { token, setToken } = useState(localStorage.getItem("scrybeToken"));

  useEffect(() => {
    const fetchUser = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };

      const response = await fetch("/api/user/me", requestOptions);

      if (!response.ok) {
        setToken(null);
      }
      localStorage.setItem("scrybeToken", token);
    };
    fetchUser();
  }, [token]);

  return (
    <UserContext.Provider value={[token, setToken]}>
      {props.children}
    </UserContext.Provider>
  );
};
