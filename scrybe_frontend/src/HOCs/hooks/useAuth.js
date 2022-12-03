import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/signin");
    }
  }, [navigate]);

  return currentUser;
};

export default useAuth;
