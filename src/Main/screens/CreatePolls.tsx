import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import LabeledInput from "../components/LabeledInput";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../Styles/LoginStyle.css";
import axios from "axios";

function CreatePolls() {
  const [inputValue, setInputValue] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    errorMsg: "",
    isSuccess: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const LoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { question, option1, option2, option3, option4 } = inputValue;
    if (question && option1 && option2 && option3 && option4) {
      setIsLoading(true);
      const Url = `https://secure-refuge-14993.herokuapp.com/add_poll?title=${question}&options=${option1}____${option2}____${option3}____${option4}`;
      axios.post(Url).then((res) => {
        if (res.data.error == 0) {
          //   navigate("/");
          console.log(res);
          setInputValue({
            question: "",
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            isSuccess: true,
            errorMsg: "your Poll successefully added",
          });
          errorMsg();
        } else {
          setInputValue({
            ...inputValue,
            isSuccess: false,
            errorMsg: res.data.message,
          });
          errorMsg();
        }
      });
      setIsLoading(false);
    } else {
      setInputValue({
        ...inputValue,
        isSuccess: false,
        errorMsg: "field should not be empty",
      });
      errorMsg();
    }
  };

  const errorMsg = () => {
    setTimeout(() => {
      setInputValue({
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        isSuccess: false,
        errorMsg: "",
      });
    }, 5000);
  };

  return (
    <>
      <Navbar />
      <div className="LogincontainerStyle">
        <form className="LogiForm" onSubmit={(e) => LoginSubmit(e)}>
          <h1 className="LoginH1">Add Your Poll Here</h1>
          <LabeledInput
            value={inputValue.question}
            lable="question"
            placeholder="question"
            type="text"
            name="question"
            onchange={onchange}
          />
          <LabeledInput
            value={inputValue.option1}
            lable="option1"
            placeholder="option1"
            type="text"
            name="option1"
            onchange={onchange}
          />
          <LabeledInput
            value={inputValue.option2}
            lable="option2"
            placeholder="option2"
            type="text"
            name="option2"
            onchange={onchange}
          />
          <LabeledInput
            value={inputValue.option3}
            lable="option3"
            placeholder="option3"
            type="text"
            name="option3"
            onchange={onchange}
          />
          <LabeledInput
            value={inputValue.option4}
            lable="option4"
            placeholder="option4"
            type="text"
            name="option4"
            onchange={onchange}
          />
          <Button type="submit" className="LoginButton">
            {isLoading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Add Your Poll"
            )}
          </Button>
        </form>

        {inputValue.errorMsg && (
          <p className={inputValue.isSuccess ? "loginSuccess" : "LoginError"}>
            {inputValue.errorMsg}
          </p>
        )}
      </div>
    </>
  );
}

export default CreatePolls;
