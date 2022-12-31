import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ErrorHandler from "../../../helpers/axioshelp/Utils/ErrorHandler";
import { useRegisterUserMutation } from "../../../redux/user/rtkquery/authApiSlice";

const createAccount = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [first_name, setFirstName] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [last_name, setLastName] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [email, setEmail] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [password, setPassword] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [emailStateTest, setEmailStateTest] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [passStateTest, setPassStateTest] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [nameStateTest, setNameStateTest] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [lastStateTest, setLastStateTest] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [visibility, setVisibility] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [btn, setBtn] = useState(true);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  const passwordTest = new RegExp(/^["0-9a-zA-Z!@#$&()\\-`.+,/"]{8,}$/),
    firstNameTest = new RegExp(/^[a-zA-Z]{2,}$/),
    lastNameTest = new RegExp(/^[a-zA-Z]{2,}$/),
    emailTest = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

  const tester = (e, reg, func) => {
    if (reg.test(e.target.value)) {
      func(true);
    } else {
      func(false);
    }
  };

  const handleFirstname = (e) => {
    setFirstName(e.target.value);
    tester(e, firstNameTest, setNameStateTest);
  };

  const handleLastname = (e) => {
    setLastName(e.target.value);
    tester(e, lastNameTest, setLastStateTest);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    tester(e, emailTest, setEmailStateTest);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    tester(e, passwordTest, setPassStateTest);
  };

  const handleToggle = () => {
    setVisibility(!visibility);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/complete-signup");

    const data = {
      first_name: first_name,
      last_name: last_name,
      password: password,
      email: email,
    };

    localStorage.setItem("data", JSON.stringify(data));
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const validate = useCallback(
    (e) => {
      if (
        first_name.length > 1 &&
        last_name.length > 1 &&
        password.length > 1 &&
        email.length > 1 &&
        emailStateTest &&
        passStateTest &&
        nameStateTest &&
        lastStateTest
      ) {
        return false;
      } else {
        return true;
      }
    },
    [
      email.length,
      emailStateTest,
      first_name.length,
      lastStateTest,
      last_name.length,
      nameStateTest,
      passStateTest,
      password.length,
    ]
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const isValid = validate();
    setBtn(isValid);
  }, [validate]);

  return {
    first_name,
    last_name,
    email,
    password,
    emailStateTest,
    passStateTest,
    nameStateTest,
    lastStateTest,
    visibility,
    btn,
    handleEmail,
    handleFirstname,
    handleLastname,
    handleSubmit,
    handlePassword,
    handleToggle,
  };
};

export { createAccount };
export { completeRegistration };

const completeRegistration = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { userData, status, error } = useSelector((state) => state.auth);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [company_name, setCompany] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [company_address, setAddress] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [addStateTest, setAddStateTest] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [companyStateTest, setCompanyStateTest] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [value, setValue] = useState({});
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [response, setResponse] = useState({ type: "", message: "" });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();

  const companyNameTest = new RegExp(/[A-Za-z0-9'.\-\s,]{4,}$/);
  const addressTest = new RegExp(/[A-Za-z0-9'.\-\s,]{8,}$/);

  const tester = (e, reg, func) => {
    if (reg.test(e.target.value)) {
      func(true);
    } else {
      func(false);
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setValue(JSON.parse(localStorage.getItem("data")));
  }, []);

  // console.log(value);

  const handleCompanyName = (e) => {
    setCompany(e.target.value);
    tester(e, companyNameTest, setCompanyStateTest);
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
    tester(e, addressTest, setAddStateTest);
  };

  const handleTotalSubmit = async (e) => {
    e.preventDefault();
    const data = {
      first_name: value.first_name,
      last_name: value.last_name,
      email: value.email,
      company_name: company_name,
      company_address: company_address,
      password: value.password,
    };
    dispatch(registerUser(data));
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (status === "success") {
      localStorage.clear();
      setResponse(
        ErrorHandler({ type: "Success", message: "Registration Successful" })
      );
      setTimeout(() => {
        navigate("/verify-signup");
      }, 2500);
    } else if (status === "failed") {
      setResponse(ErrorHandler(error));
    }
  }, [userData, status, error, navigate, dispatch]);

  return {
    handleCompanyName,
    handleAddress,
    company_name,
    company_address,
    addStateTest,
    companyStateTest,
    handleTotalSubmit,
    value,
    response,
    setResponse,
    userData,
  };
};
