import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * gets the current user from the local storage
 * @returns {object} currentUser
 */

const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [navigate]);

  return currentUser;
};

export default useAuth;
