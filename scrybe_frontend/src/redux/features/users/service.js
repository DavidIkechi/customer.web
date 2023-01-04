import UserService from "../../axios/apis/user";
import ErrorHandler from "../../axios/Utils/ErrorHandler";
import { dispatch } from "../../store";
import { setUser, setToken } from "./userSlice";
import { createResponse } from "../../Utils/UtilSlice";
import Cookies from "js-cookie";
import axios from "axios";

export const SignUp = (data) => async () => {
  try {
    const res = await UserService.SignUp(data);
    sessionStorage.setItem("heedAccessToken", res.data.access_token);
    localStorage.setItem("heedRefreshToken", res.data.refresh_token);
    Cookies.set("heedAccessToken", res.data.access_token);

    dispatch(GetAccount());
  } catch (error) {
    console.log(error);
    dispatch(createResponse(ErrorHandler(error)));
  }
};

export const SignIn = (data) => async () => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "content-type": "application/x-www-form-urlencoded",
  };
  try {
    const res = await axios.post(
      "https://api.heed.cx/users/login",
      data,
      headers
    );
    sessionStorage.setItem("heedAccessToken", res.data.access_token);
    localStorage.setItem("heedRefreshToken", res.data.refresh_token);
    Cookies.set("heedAccessToken", res.data.access_token);
    dispatch(setToken(res.data.access_token));

    dispatch(createResponse({ type: "Success", message: "Login successful" }));
    dispatch(GetAccount());
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};

export const GetAccount = () => async () => {
  try {
    const res = await UserService.Account();
    dispatch(setUser(res.data.detail));
    sessionStorage.setItem("user", JSON.stringify(res.data.detail));
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};

export const UserGoogleLogin = (email) => async () => {
  try {
    const res = await UserService.GoogleSignIn(email);
    sessionStorage.setItem("heedAccessToken", res.data.detail.access_token);
    localStorage.setItem("heedRefreshToken", res.data.detail.refresh_token);
    Cookies.set("heedAccessToken", res.data.detail.access_token);
    dispatch(setToken(res.data.detail.access_token));

    dispatch(createResponse({ type: "Success", message: "Login successful" }));
    dispatch(GetAccount());
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};
