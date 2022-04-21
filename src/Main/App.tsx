import React from "react";
import Login from "./screens/Login";
import "../Main/Styles/BodyStyle.css";
import SignUp from "./screens/SignUp";
import Home from "./screens/Home";
import { Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="SignUp" element={<SignUp />} />
        <Route path="Home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
