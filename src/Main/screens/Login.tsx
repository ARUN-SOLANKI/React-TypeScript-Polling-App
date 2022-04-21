import React, { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import LabeledInput from "../components/LabeledInput";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/LoginStyle.css";
import axios from "axios";

function Login() {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    errorMsg: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("user");
    if (token && name) {
      navigate("/Home");
    }
  }, []);

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
      setIsLoading(true);
      const Url = `https://secure-refuge-14993.herokuapp.com/login?username=${email}&password=${password}`;
      axios.post(Url).then((res) => {
        if (res.data.error == 0) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", email);
          navigate("/Home");
        } else {
          console.log(res);
          setInputValue({ ...inputValue, errorMsg: res.data.data });
          errorMsg();
        }
        setIsLoading(false);
      });
    } else {
      setInputValue({ ...inputValue, errorMsg: "field should not be empty" });
      errorMsg();
    }
  };

  const errorMsg = () => {
    setTimeout(() => {
      setInputValue({ ...inputValue, errorMsg: "" });
    }, 5000);
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
          {isLoading ? <Spinner animation="border" size="sm" /> : "Login"}
        </Button>
      </form>
      <Link to="/SignUp" className="LoginAlready">
        new user? sign up instead
      </Link>
      {inputValue.errorMsg && (
        <p className="LoginError">{inputValue.errorMsg}</p>
      )}
    </div>
  );
}

export default Login;
