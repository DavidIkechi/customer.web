import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Footer from "../../../../components/Footer";
import BlueEditPen from "../../assets/icons/blue-pencil.png";
import BlackEditPen from "../../assets/icons/edit.svg";
import ProfilePic from "../../assets/images/Pic.png";
import RedirectNav from "../../Components/SettingsPageRedirectNav/SettingsPageRedirectNav";
import PersonalInfo from "./PersonalInformationSettings.module.scss";

const PersonalInformation = ({ accountUser }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const baseUrl = "https://api.heed.hng.tech";
  const submitCallback = () => {
    window.scrollTo(0, 0);
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("heedAccessToken")}`,
      },
    };
    axios
      .patch(baseUrl + "/users/update_profile", config, {
        first_name: first_name,
        last_name: last_name,
        phone_number: phone_number,
        company_address: company_address,
        company_image: company_image,
      })
      .then((res) => {
        if (res.status) {
          console.log("success");
        }
      });
  };

  const first_name = watch("first_name");
  const last_name = watch("last_name");
  const phone_number = watch("phone_number");
  const company_address = watch("company_address");
  const company_image = watch("company_image");

  const isValid =
    first_name || last_name || phone_number || company_address || company_image;

  return (
    <>
      <RedirectNav />
      <div className="PersonalInfo-Container">
        <div className={PersonalInfo.PersonalInfo_wrapper}>
          <div className={PersonalInfo.PersonalInfo_header}>
            <img
              className={PersonalInfo.profilePic}
              src={ProfilePic}
              alt="profile pic"
            />
            <div className={PersonalInfo.changeImg}>
              <Link to="">
                <img src={BlueEditPen} alt="pencil icon to edit profile pic" />
                <span>Change profile picture</span>
              </Link>
            </div>
          </div>
          <div className={PersonalInfo.PersonalInfo_form}>
            <form
              onSubmit={handleSubmit(submitCallback)}
              action="
							  "
            >
              <div className={PersonalInfo.row}>
                <div className={PersonalInfo.formGroup}>
                  <label htmlFor="first_name">First name</label>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    placeholder={accountUser.first_name}
                  />
                </div>
                <div className={PersonalInfo.formGroup}>
                  <label htmlFor="">Last name</label>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    placeholder={accountUser.last_name}
                  />
                </div>
              </div>
              <div className={PersonalInfo.formGroup}>
                <label htmlFor="">Phone number</label>
                <input
                  type="tel"
                  name="phone_number"
                  id="phone_number"
                  placeholder={accountUser.phone_number}
                />
              </div>
              <div
                className={`${PersonalInfo.formGroup} ${PersonalInfo.editInput}`}
              >
                <label htmlFor="">Email address</label>
                <input type="email" placeholder={accountUser.email} />
                <div className={PersonalInfo.verified}>
                  {/* <p className={PersonalInfo.message}>{isVerified ? "Verified" : "Unverified"}</p> */}
                </div>
                <Link
                  to="/personal-information/edit"
                  className={PersonalInfo.edit}
                >
                  <img src={BlackEditPen} alt="" />
                  <p>EDIT</p>
                </Link>
              </div>
              <div className={`${PersonalInfo.formSubmit} formSubmit`}>
                <button>Save changes</button>
                <Link to="">Verify email</Link>
              </div>
            </form>
          </div>
        </div>
        <div className={PersonalInfo.subpages_footer}>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default PersonalInformation;
