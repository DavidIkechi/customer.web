import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// const currentUser = localStorage.getItem("heedAccessToken") || null;

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const fetchCurrentUser = async () => {
    const config = {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("heedAccessToken")}`,
      },
    };
    await axios
      .get("account", config)
      .then((res) => {
        setCurrentUser(res.data);
      })
      .catch((err) => {
        console.log(err);
        // navigate('/login');
        setCurrentUser(null);
      });
  };

  useEffect(() => {
    fetchCurrentUser();
    if (!currentUser) {
      navigate("/signin");
    }
  }, [currentUser, navigate]);

  return currentUser;
};

export default useAuth;
