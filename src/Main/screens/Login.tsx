import React, { useState } from "react";
import { Button } from "react-bootstrap";
import LabeledInput from "../components/LabeledInput";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/LoginStyle.css";

function Login() {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
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
    const { email, password } = inputValue;
    if (email && password) {
      console.log(inputValue, "--------->");
      navigate("/Home");
    } else {
      setInputValue({ ...inputValue, errorMsg: "field should not be empty" });
    }
  };

  return (
    <div className="LogincontainerStyle">
      <form className="LogiForm" onSubmit={(e) => LoginSubmit(e)}>
        <h1 className="LoginH1">Login Page</h1>
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
        <Button type="submit" className="LoginButton">
          Login
        </Button>
      </form>
      <Link to="/SignUp" className="LoginAlready">
        new user? sign up instead
      </Link>
    </div>
  );
}

export default Login;
