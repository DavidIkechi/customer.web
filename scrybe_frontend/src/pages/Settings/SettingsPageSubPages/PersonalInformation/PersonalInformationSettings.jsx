import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import BlueEditPen from "../../assets/icons/blue-pencil.png";
import BlackEditPen from "../../assets/icons/edit.svg";
import ProfilePic from "../../assets/images/Pic.png";
import RedirectNav from "../../Components/SettingsPageRedirectNav/SettingsPageRedirectNav";
import PersonalInfo from "./PersonalInformationSettings.module.scss";

const PersonalInformation = () => {
  const [accountUser, setAccountUser] = useState();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const submitCallback = () => {
    window.scrollTo(0, 0);
    const token = localStorage.getItem("heedAccessToken");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };
    const data = new FormData();
    if (firstname) {
      data.append("firstname", firstname);
    }
    if (lastname) {
      data.append("lastname", lastname);
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
          reset();
          console.log(res.data);
        }
      })
      .catch((err) => {
        // if (err) console.log(err.toJSON());
        console.log(err.response);
      });
  };

  async function getUser() {
    await axios
      // Get user details from backend
      .get("https://api.heed.hng.tech/account", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("heedAccessToken")}`,
        },
      })
      .then((res) => {
        setAccountUser(res.data);
      })
      .catch((err) => {
        // In case of error, log to the console
        console.log("Server returned the following error:");
        console.log(err);
      });
  }

  useEffect(() => {
    getUser();
  });

  const firstname = watch("firstname");
  const lastname = watch("lastname");
  const phone_number = watch("phone_number");
  const company_name = watch("company_name");
  const company_address = watch("company_address");
  const company_image = watch("company_image");

  // const isValid =
  //   firstname ||
  //   lastname ||
  //   phone_number ||
  //   company_name ||
  //   company_address ||
  //   company_image;

  return (
    <>
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
                  <label htmlFor="firstname">First name</label>
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    placeholder={accountUser?.first_name}
                    {...register("firstname")}
                  />
                </div>
                <div className={PersonalInfo.formGroup}>
                  <label htmlFor="">Last name</label>
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    placeholder={accountUser?.last_name}
                    {...register("lastname")}
                  />
                </div>
              </div>
              <div className={PersonalInfo.formGroup}>
                <label htmlFor="">Phone number</label>
                <input
                  type="tel"
                  name="phone_number"
                  id="phone_number"
                  placeholder={accountUser?.phone_number}
                  {...register("phone_number")}
                />
              </div>
              <div className={PersonalInfo.formGroup}>
                <label htmlFor="">Company name</label>
                <input
                  type="text"
                  name="company_name"
                  id="company_name"
                  placeholder={accountUser?.company_name}
                  {...register("company_name")}
                />
              </div>
              <div className={PersonalInfo.formGroup}>
                <label htmlFor="">Company address</label>
                <input
                  type="text"
                  name="company_address"
                  id="company_address"
                  placeholder={accountUser?.company_address}
                  {...register("company_address")}
                />
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
                <button type="submit">Save changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInformation;
