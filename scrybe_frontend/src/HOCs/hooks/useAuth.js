import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchUserQuery } from "../../redux/baseEndpoints";

const token = localStorage.getItem("heedAccessToken");

const useAuth = () => {
  const { data, isLoading, isError, error } = useFetchUserQuery({
    refetchOnMountOrArgChange: true,
  });
  const currentUser = data;
  const navigate = useNavigate();

  // const fetchCurrentUser = async () => {
  //   const config = {
  //     withCredentials: true,
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("heedAccessToken")}`,
  //     },
  //   };
  //   await axios
  //     .get("account", config)
  //     .then((res) => {
  //       setCurrentUser(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       // navigate('/login');
  //       setCurrentUser(null);
  //     });
  // };

  console.log("error in useAuth: ", error);
  console.log("error in useAuth: ", isError);
  useEffect(() => {
    // fetchCurrentUser();
    if (!token) {
      navigate("/login");
    }
  }, [error, navigate]);

  return currentUser;
};

export default useAuth;
