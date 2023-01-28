import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import BlueEditPen from "../../assets/icons/blue-pencil.png";
import RedirectNav from "../../Components/SettingsPageRedirectNav/SettingsPageRedirectNav";
import PersonalInfo from "./PersonalInformationSettings.module.scss";
import SnackBar from "../../../../components/SnackBar/index";
import { useSelector } from "react-redux";
import { dispatch } from "../../../../redux/store";
import { UpdateProfile } from "../../../../redux/features/users/service";

const PersonalInformation = () => {
  const { user, updatedUser } = useSelector((state) => state.user);
  const { response } = useSelector((state) => state.util);
  const [accountUser, setAccountUser] = useState();
  const [previewImg, setPreviewImg] = useState(accountUser?.company_logo_url);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const submitCallback = () => {
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

    dispatch(UpdateProfile(data));
  };

  useEffect(() => {
    if (user) {
      setAccountUser(user);
    }
    if (updatedUser) {
      reset();
      window.scrollTo(0, 0);
    }
  }, [user, updatedUser, reset]);

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
    (company_image && company_image.length > 0);

  useEffect(() => {
    if (company_image && company_image.length > 0) {
      const newImg = URL.createObjectURL(company_image[0]);
      setPreviewImg(newImg);
    }
  }, [company_image]);

  return (
    <>
      <SnackBar response={response} />
      <RedirectNav />
      <div className="PersonalInfo-Container">
        <div className={PersonalInfo.PersonalInfo_wrapper}>
          <div className={PersonalInfo.PersonalInfo_form}>
            <form onSubmit={handleSubmit(submitCallback)}>
              <div
                className={
                  !accountUser
                    ? `${PersonalInfo.PersonalInfo_header__noDisplay} ${PersonalInfo.PersonalInfo_header}`
                    : PersonalInfo.PersonalInfo_header
                }
              >
                <div className={PersonalInfo.profilePicBlank}></div>
                <img
                  className={PersonalInfo.profilePic}
                  src={previewImg}
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
