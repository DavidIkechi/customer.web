import axios from "axios";
import {
  AccountApi,
  ChangePasswordApi,
  GoogleSignInApi,
  SignUpApi,
  UpdateUserApi,
  ResetPasswordApi,
} from "../../axios/apis/user";
import ErrorHandler from "../../axios/Utils/ErrorHandler";
import { dispatch } from "../../store";
import { createResponse } from "../../utils/UtilSlice";
import {
  setError,
  setToken,
  setUpdatedUser,
  setUser,
  setResetPasswordUser,
} from "./userSlice";

export const SignUp = (data) => async () => {
  try {
    const res = await SignUpApi(data);
    sessionStorage.setItem("heedAccessToken", res.data.access_token);
    sessionStorage.setItem("heedRefreshToken", res.data.refresh_token);

    dispatch(
      createResponse({ type: "Success", message: "Registration Successful" })
    );
  } catch (error) {
    dispatch(setError(true));
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
    const rememberMe = localStorage.getItem("rememberMe");
    if (rememberMe) {
      sessionStorage.setItem("heedAccessToken", res.data.access_token);
      localStorage.setItem("heedAccessToken", res.data.access_token);
    } else {
      sessionStorage.setItem("heedAccessToken", res.data.access_token);
    }
    localStorage.setItem("heedRefreshToken", res.data.refresh_token);

    dispatch(setToken(res.data.access_token));

    dispatch(createResponse({ type: "Success", message: "Login successful" }));
    dispatch(GetAccount());
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};

export const GetAccount = () => async () => {
  try {
    const res = await AccountApi();
    dispatch(setUser(res.data.detail));
    sessionStorage.setItem("user", JSON.stringify(res.data.detail));
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};

export const UpdateProfile = (data) => async () => {
  try {
    const res = await UpdateUserApi(data);
    dispatch(setUpdatedUser(res.data.detail));
    dispatch(
      createResponse({
        type: "Success",
        message: "Profile Updated Successfully",
      })
    );
    dispatch(GetAccount());
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};

export const ChangePassword = (data) => async () => {
  try {
    const res = await ChangePasswordApi(data);
    dispatch(setUpdatedUser(res.data.detail));
    dispatch(
      createResponse({
        type: "Success",
        message: "Password reset successful",
      })
    );
    dispatch(GetAccount());
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};

export const UserGoogleLogin = (email) => async () => {
  try {
    const res = await GoogleSignInApi(email);
    const rememberMe = localStorage.getItem("rememberMe");
    if (rememberMe) {
      sessionStorage.setItem("heedAccessToken", res.data.detail.access_token);
      localStorage.setItem("heedAccessToken", res.data.detail.access_token);
    } else {
      sessionStorage.setItem("heedAccessToken", res.data.detail.access_token);
    }
    localStorage.setItem("heedRefreshToken", res.data.detail.refresh_token);
    dispatch(setToken(res.data.detail.access_token));

    dispatch(createResponse({ type: "Success", message: "Login successful" }));
    dispatch(GetAccount());
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};

export const LogOut = () => async () => {
  localStorage.clear();
  sessionStorage.clear();
  dispatch(setUser(null));
  dispatch(setToken(null));
  dispatch(createResponse({ type: "", message: "" }));
};

export const ResetPassword = (data, query) => async () => {
  try {
    const res = await ResetPasswordApi(data, query);
    dispatch(setResetPasswordUser(res.data.detail));
    dispatch(
      createResponse({
        type: "Success",
        message: "Password reset successful",
      })
    );
    dispatch(GetAccount());
  } catch (error) {
    dispatch(createResponse(ErrorHandler(error)));
  }
};
