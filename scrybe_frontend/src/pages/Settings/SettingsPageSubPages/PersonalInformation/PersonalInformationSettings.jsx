import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import BlueEditPen from "../../assets/icons/blue-pencil.png";
// import BlackEditPen from "../../assets/icons/edit.svg";
// import ProfilePic from "../../assets/images/Pic.png";
import RedirectNav from "../../Components/SettingsPageRedirectNav/SettingsPageRedirectNav";
import PersonalInfo from "./PersonalInformationSettings.module.scss";
import ErrorHandler from "../../../../helpers/axioshelp/Utils/ErrorHandler";
import SnackBar from "../../../../components/SnackBar/index";
import ApiService from "../../../../helpers/axioshelp/apis";

const PersonalInformation = () => {
  const [accountUser, setAccountUser] = useState();
  const [response, setResponse] = useState({ type: "", message: "" });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const submitCallback = () => {
    const token = localStorage.getItem("heedAccessToken");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };
    const data = new FormData();
    if (first_name) {
      data.append("firstname", first_name);
    }
    if (last_name) {
      data.append("lastname", last_name);
    }
    if (company_name) {
      data.append("company_name", company_name);
    }
    if (company_address) {
      data.append("company_address", company_address);
    }
    if (phone_number) {
      data.append("phone_number", phone_number);
    }
    if (company_image[0]) data.append("image_file", company_image[0]);
    axios
      .request({
        method: "patch",
        url: "https://api.heed.hng.tech/users/update_profile",
        data: data,
        headers,
      })
      .then((res) => {
        if (res.status) {
          window.scrollTo(0, 0);
          reset();
          getUser();
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  async function getUser() {
    try {
      const res = await ApiService.Account();
      setAccountUser(res.data);
    } catch (err) {
      console.log("err");
      if (err.response.status === 401) {
        navigate("/signin");
      }
      setResponse(ErrorHandler(err));
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  const first_name = watch("first_name");
  const last_name = watch("last_name");
  const phone_number = watch("phone_number");
  const company_name = watch("company_name");
  const company_address = watch("company_address");
  const company_image = watch("company_image");

  const isValid =
    first_name ||
    last_name ||
    phone_number ||
    company_name ||
    company_address ||
    company_image instanceof File;

  return (
    <>
      <SnackBar response={response} setResponse={setResponse} />
      <RedirectNav />
      <div className="PersonalInfo-Container">
        <div className={PersonalInfo.PersonalInfo_wrapper}>
          <div className={PersonalInfo.PersonalInfo_form}>
            <form onSubmit={handleSubmit(submitCallback)}>
              <div className={`${PersonalInfo.PersonalInfo_header}`}>
                <img
                  className={PersonalInfo.profilePic}
                  src={accountUser?.company_logo_url}
                  alt="profile pic"
                />
                <div className={PersonalInfo.changeImg}>
                  <label htmlFor="company_image">
                    <img
                      src={BlueEditPen}
                      alt="pencil icon to edit profile pic"
                    />
                    <span>Change profile picture</span>
                  </label>
                </div>
                <input
                  type="file"
                  name="company_image"
                  id="company_image"
                  value={accountUser?.company_image_url}
                  hidden
                  {...register("company_image")}
                />
              </div>
              <div className={PersonalInfo.row}>
                <div className={PersonalInfo.formGroup}>
                  <label htmlFor="first_name">First name</label>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    placeholder={accountUser?.first_name}
                    className={`${
                      errors.first_name && PersonalInfo.errorInput
                    } `}
                    {...register("first_name", {
                      pattern: {
                        value: /^[a-z'-]+$/i,
                        message: "Please enter a valid first name",
                      },
                    })}
                  />
                  <p className={PersonalInfo.errorMsg}>
                    {errors.first_name?.message}
                  </p>
                </div>
                <div className={PersonalInfo.formGroup}>
                  <label htmlFor="">Last name</label>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    placeholder={accountUser?.last_name}
                    className={`${
                      errors.last_name && PersonalInfo.errorInput
                    } `}
                    {...register("last_name", {
                      pattern: {
                        value: /^[a-z'-]+$/i,
                        message: "Please enter a valid last name",
                      },
                    })}
                  />
                  <p className={PersonalInfo.errorMsg}>
                    {errors.last_name?.message}
                  </p>
                </div>
              </div>
              <div className={PersonalInfo.formGroup}>
                <label htmlFor="">Phone number</label>
                <input
                  type="tel"
                  name="phone_number"
                  id="phone_number"
                  placeholder={accountUser?.phone_number}
                  className={`${
                    errors.phone_number && PersonalInfo.errorInput
                  } `}
                  {...register("phone_number", {
                    pattern: {
                      value: /^[0-9]+$/i,
                      message: "Please enter a valid phone number",
                    },
                  })}
                />
                <p className={PersonalInfo.errorMsg}>
                  {errors.phone_number?.message}
                </p>
              </div>
              <div className={PersonalInfo.formGroup}>
                <label htmlFor="">Company name</label>
                <input
                  type="text"
                  name="company_name"
                  id="company_name"
                  placeholder={accountUser?.company_name}
                  className={`${
                    errors.company_name && PersonalInfo.errorInput
                  } `}
                  {...register("company_name", {
                    pattern: {
                      value: /^[a-z '.-]+$/i,
                      message: "Please enter a valid company name",
                    },
                  })}
                />
                <p className={PersonalInfo.errorMsg}>
                  {errors.company_name?.message}
                </p>
              </div>
              <div className={PersonalInfo.formGroup}>
                <label htmlFor="">Company address</label>
                <input
                  type="text"
                  name="company_address"
                  id="company_address"
                  placeholder={accountUser?.company_address}
                  className={`${
                    errors.company_address && PersonalInfo.errorInput
                  } `}
                  {...register("company_address", {
                    pattern: {
                      value: /^[\w #'.,-]+$/i,
                      message: "Please enter a valid address",
                    },
                  })}
                />
                <p className={PersonalInfo.errorMsg}>
                  {errors.company_address?.message}
                </p>
              </div>
              {/* <div
                className={`${PersonalInfo.formGroup} ${PersonalInfo.editInput}`}
              >
                <label htmlFor="">Email address</label>
                <input type="email" name placeholder={accountUser?.email} />
                <div className={PersonalInfo.verified}>
                </div>
                <Link
                  to="/personal-information/edit"
                  className={PersonalInfo.edit}
                >
                  <img src={BlackEditPen} alt="" />
                  <p>EDIT</p>
                </Link>
              </div> */}
              <div className={`${PersonalInfo.formSubmit} formSubmit`}>
                <button
                  type="submit"
                  disabled={!isValid}
                  className={`${isValid && PersonalInfo.submitValid}`}
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInformation;
