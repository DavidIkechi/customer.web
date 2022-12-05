import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const currentUser = localStorage.getItem("heedAccessToken") || null;

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
