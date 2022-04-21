import React from "react";
import Login from "./screens/Login";
import "../Main/Styles/BodyStyle.css";
import SignUp from "./screens/SignUp";
import Home from "./screens/Home";
import AllPolls from "./screens/AllPolls";
import CreatePolls from "./screens/CreatePolls";
import AllUsers from "./screens/AllUsers";
import { Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="SignUp" element={<SignUp />} />
        <Route path="Home" element={<Home />} />
        <Route path="Home/AllPolls" element={<AllPolls />} />
        <Route path="Home/CreatePolls" element={<CreatePolls />} />
        <Route path="Home/AllUsers" element={<AllUsers />} />
      </Routes>
    </>
  );
}

export default App;
