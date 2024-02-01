import { axios } from "./axios";

export const getUser = () => {
  const bitsanAccessToken = localStorage.getItem("bitsanAccessToken");
  const bitsanRefreshToken = localStorage.getItem("bitsanRefreshToken");
 
  axios
    .post("/private", { bitsanAccessToken, bitsanRefreshToken })
    .then((data) => {
        // console.log(data);
      if (data?.data.accessToken) {
        localStorage.setItem("bitsanAccessToken", data?.data?.accessToken);
      }
      return data;
    })
    .catch((error) => {
      console.log(error)
      return null;
    }); 
};
