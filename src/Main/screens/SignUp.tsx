import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import LabeledInput from "../components/LabeledInput";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/LoginStyle.css";
import axios from "axios";

function SignUp() {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    errorMsg: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  console.log(isLoading);

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
        setIsLoading(true);
        const Url = `https://secure-refuge-14993.herokuapp.com/add_user?username=${email}&password=${password}&role=${password}`;

        axios
          .post(Url)
          .then((res) => {
            if (res.data.error === 1) {
              setIsLoading(false);
              setInputValue({
                ...inputValue,
                errorMsg: res.data.message,
              });
              errorMsg();
            }
            if (res.data.error == 0) {
              setIsLoading(false);
              navigate("/");
            }
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
      } else {
        setInputValue({
          ...inputValue,
          errorMsg: "password and confirm password should be same",
        });
        errorMsg();
      }
    } else {
      setInputValue({
        ...inputValue,
        errorMsg: "field should not be empty",
      });
      errorMsg();
    }
  };

  const errorMsg = () => {
    setTimeout(() => {
      setInputValue({ ...inputValue, errorMsg: "" });
    }, 5000);
  };

  //   else {
  //     setInputValue({
  //       ...inputValue,
  //       errorMsg: res.data.message,
  //     });
  //     errorMsg();
  //   }
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
          {isLoading ? <Spinner animation="border" size="sm" /> : "Sign Up"}
        </Button>
      </form>
      <Link to="/" className="LoginAlready">
        already a user? login instead
      </Link>
      {inputValue.errorMsg && (
        <p className="LoginError">{inputValue.errorMsg}</p>
      )}
    </div>
  );
}

export default SignUp;
