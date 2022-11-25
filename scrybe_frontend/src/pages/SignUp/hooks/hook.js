import axios from "axios";
import { useEffect, useState } from "react";

const useMockUser = (id) => {
  const [mockUser, setMockUser] = useState({});
  useEffect(() => {
    const data =
      "grant_type=&username=obiomavon%40gmail.com&password=just4von111&scope=&client_id=&client_secret=";
    axios.post("http://scrybe.hng.tech:5000/login", data).then((res) => {
      const headers = {
        Authorization: `Bearer ${res.data.access_token}`,
      };
      axios
        .get("http://scrybe.hng.tech:5000/users/", { headers })
        .then((newRes) => {
          setMockUser(newRes.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, []);

  return mockUser;
};

export { useMockUser };
