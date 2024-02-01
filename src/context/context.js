import React, {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getUser } from "../utils/userRetrieve";
import { axios } from "../utils/axios";

// export const getUser = () => {
//   const bitsanAccessToken = localStorage.getItem("bitsanAccessToken");
//   const bitsanRefreshToken = localStorage.getItem("bitsanRefreshToken");

//   axios
//     .post("/private", { bitsanAccessToken, bitsanRefreshToken })
//     .then((data) => {
//         // console.log(data);
//       if (data?.data.accessToken) {
//         localStorage.setItem("bitsanAccessToken", data?.data?.accessToken);
//       }
//       return data;
//     })
//     .catch((error) => {
//       console.log(error)
//       return null;
//     });
// };

export const userCOntext = createContext();
function ContextProvider({ children }) {
  const bitsanAccessToken = localStorage.getItem("bitsanAccessToken");
  const bitsanRefreshToken = localStorage.getItem("bitsanRefreshToken");

  const [user, setUser] = useState(undefined);

  const refetchUser = (accessToken,refreshToken) =>{
    console.log("access token", bitsanAccessToken)
    console.log("refresh token ",bitsanRefreshToken)
    
    axios
    .post("/private", { bitsanAccessToken, bitsanRefreshToken })
    .then((data) => {
      if (data?.data.accessToken) {
        localStorage.setItem("bitsanAccessToken", data?.data?.accessToken);
      }
      setUser(data.data);
      console.log(data.data);
    })
    .catch((error) => {
      console.log(error);
      setUser(undefined)
    });
  }

  useEffect(() => {
    refetchUser()
  }, []);

  return (
    <userCOntext.Provider value={{ user, setUser, refetchUser }}>
      {children}
    </userCOntext.Provider>
  );
}

export default ContextProvider;
