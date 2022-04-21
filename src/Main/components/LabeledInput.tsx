import React, { useState } from "react";
import "../Styles/LoginStyle.css";
type LabeledInputProps = {
  lable: string;
  placeholder: string;
  type?: string;
  onchange: (Event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
  confirmPassword?: string;
};

function LabeledInput({
  lable,
  placeholder,
  type = "text",
  onchange,
  value,
  name,
  confirmPassword,
}: LabeledInputProps) {
  return (
    <div className="LabelInputContainer">
      <label className="loginLable">{lable} : </label>
      <input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        className="loginInput"
        onChange={(e) => {
          onchange(e);
        }}
      />
    </div>
  );
}

export default LabeledInput;
