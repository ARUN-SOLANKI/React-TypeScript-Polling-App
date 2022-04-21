import React, { useState } from "react";
import { Button } from "react-bootstrap";
import LabeledInput from "../components/LabeledInput";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/LoginStyle.css";

function SignUp() {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    errorMsg: "",
  });
  const navigate = useNavigate();

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const LoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password, confirmPassword } = inputValue;
    if (email && password && confirmPassword) {
      if (password === confirmPassword) {
        console.log(inputValue);
        navigate("/");
      } else {
        setInputValue({
          ...inputValue,
          errorMsg: "password and confirm password should be same",
        });
      }
    } else {
      setInputValue({
        ...inputValue,
        errorMsg: "field should not be empty",
      });
    }
  };

  console.log(inputValue, "-------->");
  return (
    <div className="LogincontainerStyle">
      <form className="LogiForm" onSubmit={(e) => LoginSubmit(e)}>
        <h1 className="LoginH1">Registered Here</h1>
        <LabeledInput
          value={inputValue.email}
          lable="Email Address"
          placeholder="Email Address"
          type="text"
          name="email"
          onchange={onchange}
        />
        <LabeledInput
          value={inputValue.password}
          lable="Password"
          placeholder="Password"
          type="Password"
          name="password"
          onchange={onchange}
        />
        <LabeledInput
          value={inputValue.confirmPassword}
          lable="Confirm Password"
          placeholder="Confirm Password"
          type="Password"
          name="confirmPassword"
          onchange={onchange}
        />
        <Button type="submit" className="LoginButton">
          Sign Up
        </Button>
      </form>
      <Link to="/" className="LoginAlready">
        already a user? login instead
      </Link>
    </div>
  );
}

export default SignUp;
