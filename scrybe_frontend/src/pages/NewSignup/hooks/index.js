import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    navigate("/complete-signup");

    const data = {
      first_name: first_name,
      last_name: last_name,
      password: password,
      email: email,
    };

    // console.log(data);
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

const completeRegistration = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [company_name, setCompany] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [company_address, setAddress] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [addStateTest, setAddStateTest] = useState("false");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [companyStateTest, setCompanyStateTest] = useState(false);

  const companyNameTest = new RegExp(/^[a-zA-Z]{2,}$/);
  const addressTest = new RegExp(
    /^(\d{1,}) [a-zA-Z0-9\s]+(\.)? [a-zA-Z]+(\,)? [A-Z]{2} [0-9]{5,6}/g
  );

  const tester = (e, reg, func) => {
    if (reg.test(e.target.value)) {
      func(true);
    } else {
      func(false);
    }
  };

  const handleCompanyName = (e) => {
    setCompany(e.target.value);
    tester(e, companyNameTest, setCompanyStateTest);
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
    tester(e, addressTest, setAddStateTest);
  };

  const handleTotalSubmit = (e) => {
    e.preventDefault();
    console.log("yay!");
  };

  return {
    handleCompanyName,
    handleAddress,
    company_name,
    company_address,
    addStateTest,
    companyStateTest,
    handleTotalSubmit,
  };
};

export { completeRegistration };
